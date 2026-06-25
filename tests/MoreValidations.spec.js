const {test, expect} = require('@playwright/test');

test("@Web Popup Validations", async ({page})=> {


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    /*
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();
    */

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on("dialog", dialog => dialog.accept());

    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();

    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const frameText = await framesPage.locator(".text h2").textContent();

    const numCheck = frameText.split(" ")[1];
    console.log(numCheck);

});

test("@Web Screenshot & Visual comparision", async ({page})=> {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'partialscreenshot.png'}); // takes picture of only element
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'}); // takes picture of full screen

    await expect(page.locator("#displayed-text")).toBeHidden();

})

test("Visual Comparison", async({page})=> {
    await page.goto("https://flightaware.com/");
    expect (await page.screenshot()).toMatchSnapshot("landing.png");
})