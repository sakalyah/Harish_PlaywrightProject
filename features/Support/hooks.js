const { Before,BeforeStep,After,AfterStep } = require("@cucumber/cucumber");
const { test, expect } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');


Before(async function () {

    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
    //this.poManager is a property of the World object, which is accessible in all step definitions. It allows you to share the same instance of POManager across different steps in your test scenario.
});

//Tagged Hooks: These hooks are executed only for scenarios that are tagged with the specified tag. In this case, the hook will run before scenarios tagged with @foo.
//Official Documentation
Before({tags : "@foo" },async function () {
     
    // tags : @foo and @poo 
    //tags : @foo or @poo
});

BeforeStep(async function () {

});

AfterStep(async function ({result}) {

    if( result.status === 'FAILED') {
        await this.page.screenshot({ path: `./screenshots/${Date.now()}.png`, fullPage: true });
    }

});

After(async function () {
    console.log("After hook executed");
});

//Other Annotations are BeforeAll, BeforeStep, AfterAll, AfterStep, After, Around. These annotations are used to define hooks that run before or after specific events in the test execution lifecycle.