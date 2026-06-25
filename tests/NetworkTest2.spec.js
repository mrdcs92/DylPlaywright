const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../helpers/ApiUtils');

test("Security test request intercept", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.fill("#userEmail", "misterdcs92@gmail.com");
    await page.fill("#userPassword", "1999222dst!taN1999222");
    await page.locator("#login").click();

    await page.waitForLoadState('networkidle');
    // waiting for cards to load
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();



    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a1cae9917ee3e78baadef94' })
    );

    await (page.locator("button:has-text('View')")).first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})