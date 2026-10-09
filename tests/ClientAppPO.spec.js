const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));
const dataSetArray = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData_Array.json')));
const { customtest } = require('../utils/fixtures.js');

test.describe.configure({ mode: 'parallel' });
// Enables to run the tests in parallel. This is a test level configuration. This can be overridden at the test level using the syntax test.describe('test name', async () => { ... }, { mode: 'serial' });

test('@Web Client App login using Single DataSet', async ({ page }) => {
  const poManager = new POManager(page);
  //js file- Login js, DashboardPage
  // const username = dataSet.username;
  // const password = dataSet.password;
  // const productName = dataSet.productName;
  const products = page.locator(".card-body");
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(dataSet.username, dataSet.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(dataSet.productName);
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

  //Zara Coat 4
});

for (const data of dataSetArray) {
  test(`Client App login using Multiple DataSet - ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}

customtest('Client App login using - using fixtures', async ({ page, testDataForOrder }) => 
{
   const poManager = new POManager(page);
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
});












