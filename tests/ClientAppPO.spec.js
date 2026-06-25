const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');
const {POManager}  = require('../pageObjects/POManager');
const dataset = JSON.parse(JSON.stringify(require('../helpers/placeOrderTestData.json')));

test('@API Sample Test', async ({page}) => {

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.validLogin(dataset.username, dataset.password);

    const dashBoardPage = poManager.getDashboardPage();
    await dashBoardPage.searchProductAddCart(dataset.productName);
    await dashBoardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataset.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashBoardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    //await page.pause();
    



    // select zara coat 4
    // select zara coat 5

});