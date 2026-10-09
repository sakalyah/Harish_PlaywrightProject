import { test as base, expect, Locator, Page, request } from '@playwright/test';
// APIUtils.ts currently has no ES module export, so load it via CommonJS.
declare const require: (moduleName: string) => { APIUtils: new (...args: any[]) => any };
const { APIUtils } = require('./APIUtils.ts');
//const { expect, request } = require('@playwright/test');
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };

interface TestFixtures {
    authenticatedPage: Page;
    createOrder: any;
    testDataForOrder: {
        username: string;
        password: string;
        productName: string;
    };
};

export const customtest = base.extend<TestFixtures>(
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

        createOrder: async ({ }: any, use: (arg0: any) => any) => {
            const apiContext = await request.newContext();
            const apiUtils = new APIUtils(apiContext, loginPayLoad);
            Response = await apiUtils.createOrder(orderPayLoad);
            await use(Response);
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