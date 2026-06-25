const {test, expect} = require('@playwright/test');
const { strict: assert } = require('assert');

test('First Playwright Test', async ({page})=> {

    //const context = await browser.newContext();
    //const page = await context.newPage();

    await page.goto('https://google.com');

    console.log(await page.title());
    await expect(page).toHaveTitle(/Google/);

    assert.equal(await page.title(), "Goggly");

    // Expect a title "to contain" a substring.
    //await expect(page).toHaveTitle(/Playwright/);

});

test('Browser Context Test', async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/#/');

    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await signInBtn.click();

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toHaveText("Incorrect username/password.");

    await userName.clear();
    await userName.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signInBtn.click();

    console.log(await cardTitles.first().textContent());
   // console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    // Expect a title "to contain" a substring.
    //await expect(page).toHaveTitle(/Playwright/);

});

test('UI Basic Controls', async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/#/');

    const userName = page.locator("#username");
    const signInBtn = page.locator("#signInBtn");

    const dropdown = await page.locator("select.form-control");
    await dropdown.selectOption("consult");

    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();


    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    console.log( await page.locator("#terms").isChecked());
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    console.log( await page.locator("#terms").isChecked());
    await expect(page.locator("#terms")).not.toBeChecked();

    const documentLink = await page.locator("[href*='documents-request']");
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    await page.pause();

    
});

test('Child Windows Handle', async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();   

    await page.pause();
    const userName = page.locator("#username");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/#/');
    const documentLink = await page.locator("[href='https://rahulshettyacademy.com/documents-request']");
    
    const [newPage] = await Promise.all(
        [
        context.waitForEvent('page'), // listens for new page event
        documentLink.click(), // new page is opened
        ]
    );

    const text = await newPage.locator(".red").textContent();
    console.log(text);

    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await page.locator("#username").fill(domain);
    console.log( await userName.inputValue());

    await page.pause();

});