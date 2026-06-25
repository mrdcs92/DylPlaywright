const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');


test('Sample Test', async ({page}) => {

    const productName = "ZARA COAT 3";

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("misterdcs92@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("1999222dst!taN1999222");
    await page.getByRole("button", {name: "Login"}).click();
    //await page.locator("#login").click();

    await page.waitForLoadState('networkidle');
    // waiting for cards to load
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText: productName}).getByRole("button", {name: "Add To Cart"}).click();

    /*
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const products = page.locator(".card-body");
    const count = await products.count();
    console.log("Number of products: " + count);

    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    */

    //await page.locator("[routerlink*='cart']").click();
    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
    await page.locator("div li").first().waitFor();

    await expect(page.getByText(productName)).toBeVisible();
    await page.getByRole("button", {name: "Checkout"}).click();


    //await page.locator("text=Checkout").click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay:150});
    await page.getByRole("button", {name: "India"}).nth(1).click();
    //await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:150});
    /*
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    */

    await page.getByText("Place Order").click();

    //await expect(page.locator(".user__name [type='text']").first()).toHaveText("misterdcs92@gmail.com");
    //await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    console.log(orderID);

    await page.locator("button[routerlink*='myorders']").click();
    // waiting for orders to load
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderID)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }    
    }

    const orderDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderDetails)).toBeTruthy();



    await page.pause();
    



    // select zara coat 4

});