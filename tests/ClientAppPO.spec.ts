import { test, expect, Locator, Page } from "@playwright/test";
import { POManager } from "../pageObjects_ts/POManager";
import { customTest } from '../helpers/test-base';
const dataset = JSON.parse(JSON.stringify(require('../helpers/placeOrderTestData.json')));

test('@API Sample Test', async ({page}) => {

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();

    loginPage.goTo();
    loginPage.validLogin(dataset.username, dataset.password);

    const dashBoardPage = poManager.getDashboardPage();
    await dashBoardPage.searchProductAddCart(dataset.productName);
    await dashBoardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataset.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    let orderId: any;
    orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashBoardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    //await page.pause();
    



    // select zara coat 4

});

customTest('@API Sample Test 2', async ({page, testDataForOrder}) => {

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();

    loginPage.goTo();
    loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dashBoardPage = poManager.getDashboardPage();
    await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
    await dashBoardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    let orderId: any;
    orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashBoardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    //await page.pause();
    



    // select zara coat 4

});