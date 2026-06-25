const { When, Then, Given } = require('@cucumber/cucumber');
const { test, expect } = require('@playwright/test');
const { POManager } = require('../../pageObjects/POManager');
const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(username, password);
});

When('Add {string} to cart', async function (productName) {
  this.dashBoardPage = this.poManager.getDashboardPage();
  await this.dashBoardPage.searchProductAddCart(productName);
  await this.dashBoardPage.navigateToCart();;
});

Then('Verify {string} is displayed in the cart', async function (productName) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

When('Enter valid details and Place the Order', async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});

Then('Verify order in present in the Order History', async function () {
  await this.dashBoardPage.navigateToOrders();

  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
  await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/#/');

  const userName = this.page.locator("#username");
  const signInBtn = this.page.locator("#signInBtn");
  const cardTitles = this.page.locator(".card-body a");

  await userName.fill(username);
  await this.page.locator("[type='password']").fill(password);
  await signInBtn.click();

});

Then('Verify Error Message is displayed', async function () {
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toHaveText("Incorrect username/password.");

});

// npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html --retry 1