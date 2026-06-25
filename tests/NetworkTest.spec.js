const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('../helpers/ApiUtils');

const loginPayLoad = {"userEmail": "misterdcs92@gmail.com", "userPassword": "1999222dst!taN1999222"};
const orderPayLoad = {"orders": [{"country": "Cuba", "productOrderedId": "6960eac0c941646b7a8b3e68"}]};
const fakePayLoadOrders = {data: [], message: "No Orders"};

let response;

test.beforeAll( async ()=> {

    //Login APi
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);


});


test('Sample Test', async ({page}) => {

    //const ApiUtils = new ApiUtils(apiContext, loginPayLoad);
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    const productName = "ZARA COAT 3";

    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                response,
                body,
            });
        }
    );

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());

    // waiting for orders to load
    /*
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderID)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }    
    }

    const orderDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderDetails)).toBeTruthy();
    */


    
    
    // verify if order created is showing in history page


    // select zara coat 4

});