const { Given, When, Then } = require('@cucumber/cucumber');
const { test, expect } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');

Given('I am on the eCommerce homepage', { timeout: 6000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    //playwright keyword to be imported to have browser and page keywords to get life
    // const browser = await playwright.chromium.launch({ headless: false });
    // const context = await browser.newContext();
    // const page = await context.newPage();
    // this.poManager = new POManager(page);
    //ABOVE code is moved to hooks.js file to make it reusable across all step definitions
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataSet.username, dataSet.password);
});

When('I search for {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('I should see a list of products related to {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('I am on the product page for {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I click on {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('the product should be added to my shopping cart', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('I have items in my shopping cart', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I proceed to checkout', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I enter valid payment information', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('my order should be successfully placed', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});