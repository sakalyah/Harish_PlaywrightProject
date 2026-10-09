const base = require('@playwright/test');
const { APIUtils } = require('./APIUtils.js');
const { expect, request } = require('@playwright/test');
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };

exports.customtest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {
            const context = await browser.newContext();
            const page = await context.newPage();
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
            await page.waitForLoadState('networkidle');
            await use(page);
            //tear Down
            await context.close();
        },

        createOrder: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APIUtils(apiContext, loginPayLoad);
            response = await apiUtils.createOrder(orderPayLoad);
            await use(response);
            //tear down
            await apiContext.dispose();

        },

        testDataForOrder: {
            username: "anshika@gmail.com",
            password: "Iamking@000",
            productName: "Zara Coat 4"
        }

    }
);