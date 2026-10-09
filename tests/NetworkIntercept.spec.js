const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('@SP Place the order', async ({ page }) => {
  page.addInitScript(value => {

    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");


  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body,

        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });

  await page.locator("button[routerlink*='myorders']").click();
  //Challenge - wait for the response to come back and then print the text on the page
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

  console.log(await page.locator(".mt-4").textContent());



});


test('@QW Security test request intercept', async ({ page }) => {

  //login and reach orders page
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();

  await page.locator("button[routerlink*='myorders']").click();
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");


})

test('Aborting Network Calls and Loggin Request and Response Calls', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  //Aborts all Images requests on page
  page.route('**/*.{png,jpg,jpeg}', route => route.abort());
  page.on('request', request => console.log(request.url()));
  page.on('response', response => console.log(response.url(), response.status()));
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});