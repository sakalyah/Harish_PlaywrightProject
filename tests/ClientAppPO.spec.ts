import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects_TypeScripts/POManager.ts';
import dataSet from '../utils/placeOrderTestData.json';
import dataSetArray from '../utils/placeOrderTestData_Array.json';
import { customtest } from '../utils_for_TS/fixtures.ts';

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
  await dashboardPage.searchProductAddCart(dataSet.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(dataSet.productName);
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  if (orderId === null) throw new Error('Order ID was not returned');
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  const historyOrderId = await ordersHistoryPage.getOrderId();
  if (historyOrderId === null) throw new Error('Order ID was not found in order history');
  expect(orderId.includes(historyOrderId)).toBeTruthy();

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
    if (orderId === null) throw new Error('Order ID was not returned');
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    const historyOrderId = await ordersHistoryPage.getOrderId();
    if (historyOrderId === null) throw new Error('Order ID was not found in order history');
    expect(orderId.includes(historyOrderId)).toBeTruthy();
  });
}

customtest('Client App login using - using fixtures', async ({ page, testDataForOrder }: any) => {
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