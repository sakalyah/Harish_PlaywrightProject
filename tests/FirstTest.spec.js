const { test, expect } = require('@playwright/test');
//const { version } = require('punycode');

//browser = common fixture , wrap it in curly braces
//Fixtures = Global variables

test('Harish First Test', async ({ }) => {
    //If we do not want to inject any specific cookies / proxy to browser , we can use page fixture
    // to immediately land on the page without creating a new context
    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto('https://www.google.com/');

});

test('Harish Second Test', async ({ }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    //type method is deprecated , use fill method instead . WHY ?
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator("select.form-control").selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    await page.locator('#terms').click();
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute('class', 'blinkingText');
    await page.locator('#signInBtn').click();
    //await page.pause();
});

test('Harish Third Test', async ({ }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    //type method is deprecated , use fill method instead
    await page.locator("#username").fill('rahulshettyacademy');
    await page.locator("#password").fill('Learning@830$3mK2123');
    await page.locator("#signInBtn").click();
    console.log(await page.locator('[style*="block"]').textContent());
    expect(await page.locator("[style*='block']")).toContainText('Incorrect');
    await page.locator("#password").fill('');
    await page.locator("#password").fill('Learning@830$3mK2');
    await page.locator("#signInBtn").click();
    //textContent has capability of autowaiting
    console.log(await page.locator(".card-body a").nth(0).textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
    const allProductsOnPageCSS = page.locator(".card-body a");
    //allTextContents() returns an array of all the text contents of the elements matching the locator
    //and does not have autowaiting capability
    const allTitlesOnPage = await allProductsOnPageCSS.allTextContents();
    console.log(allTitlesOnPage);

});

test('Harish Fourth Test', async ({ }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    console.log(await page.title());
    await page.locator("#userEmail").fill('harishsakalya@gmail.com');
    await page.locator("#userPassword").fill('Ganesha@1');
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');//Waits untill network isin ideal state
    const allProductsDashboard = page.locator(".card-body b");
    const allTitlesDashboard = await allProductsDashboard.allTextContents();
    console.log(allTitlesDashboard);

});

test('Harish UI Controls Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
            documentLink.click(),

        ])//new page is opened
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    //textContent extracts the text from the element attached to the DOM
    //inputValue exrtracts text inserted inside a text box dynamically by the user or by the script
    console.log(await page.locator("#username").inputValue());
    //await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
});

test('Playwright Special locators', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click(); //Filtering locators can be done via {}
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

    //locator(css)

});

test('Playwright Special locators2', async ({ page }) => {

    //Applies to only one test in the file. If we want to apply it to all tests in the file, we can use test.setTimeout() in the playwright.config.js file
    test.setTimeout(50 * 1000); //Max time a particular test can run for. Should be used inside the test file. This is a test level timeout.
    const slowExpect = expect.configure({ timeout: 10000 }); //test level expect timeout
    page.setDefaultTimeout(10000); //test level timeout for all actions
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    //getByLabel might not work for all the elements where we need to give a input value. 
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click(); //Filtering locators can be done via {}
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    await expect(page.getByText('Success!')).toBeVisible({ timeout: 10000 }); //Step level expect timeout
    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

    //locator(css)

});

test('Playwright Frames and Javascript Popups', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https:google.com");
    await page.goBack();
    //await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();

});

test('Playwright Partial and Page Screenshot', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https:google.com");
    await page.goBack();
    //await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: 'tests/screenshots/displayed-text.png' });
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: 'tests/screenshots/hide-textbox-full.png' });
    await expect(page.locator("#displayed-text")).toBeHidden();

});

test.only('Playwright Visual Regression Testing', async ({ page }) => {

    await page.goto("https://flightaware.com/");
    expect(await page.screenshot()).toMatchSnapshot('flightaware.png');
    // During Frist Run flightaware.png would not be found and will be created through this script
    // Second execution will compare the screenshot with the existing flightaware.png and if there is any difference, it will fail the test.

});