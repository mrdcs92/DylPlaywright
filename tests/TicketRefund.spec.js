const {test, expect} = require('@playwright/test');

const { pageLogin } = require('../helpers/login');

test('Ticket Refund Test', async ({page})=> { 

    // Step 1
    await pageLogin(page, "mrdcs92@gmail.com", "19922dst!taN19922");

    //Step 2
    await page.getByTestId("event-card").first().getByTestId("book-now-btn").click();

    await page.getByLabel("Full Name").fill("John Doe");
    await page.getByLabel("Email").fill("mrdcs92@gmail.com");
    await page.getByLabel("Phone Number").fill("1234567890");

    await page.locator(".confirm-booking-btn").click();

    // Step 3
    await page.getByRole('button', { name: 'View My Bookings' }).click();

    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");

    await page.getByRole("button", { name: "View Details" }).first().click();

    await expect(page.getByText("Booking Information")).toBeVisible();

    //Step 4
    const bookingId = await page.locator("nav").nth(1).locator("span").nth(1).textContent();
    const bookingIdLetter = bookingId.split("-")[0].toLowerCase();
    const eventName = await page.locator("h1").textContent();
    const eventNameLetter = eventName.split("")[0].toLowerCase();

    expect(bookingIdLetter).toBe(eventNameLetter);

    // Step 5
    await page.getByRole("button", {name: "Check eligibility for refund?"}).click();

    await expect(page.getByTestId("refund-spinner")).toBeVisible();
    await expect(page.getByTestId("refund-spinner")).not.toBeVisible({timeout: 6000});

    // Step 6
    await expect(page.locator("#refund-result")).toBeVisible();
    const refundText = await page.locator("#refund-result").textContent();

    console.log(refundText);
    expect(refundText).toContain("Single-ticket bookings qualify for a full refund");

});

test('Ticket Not Eligible for Refund Test', async ({page})=> {

    // Step 1
    await pageLogin(page, "mrdcs92@gmail.com", "19922dst!taN19922");

    //Step 2
    await page.getByTestId("event-card").first().getByTestId("book-now-btn").click();

    await page.getByLabel("Full Name").fill("John Doe");
    await page.getByLabel("Email").fill("mrdcs92@gmail.com");
    await page.getByLabel("Phone Number").fill("1234567890");
    await page.getByRole("button", {name: "+"}).click({clickCount: 2});

    await page.locator(".confirm-booking-btn").click();

    // Step 3
    await page.getByRole('button', { name: 'View My Bookings' }).click();

    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");

    await page.getByRole("button", { name: "View Details" }).first().click();

    await expect(page.getByText("Booking Information")).toBeVisible();

    //Step 4
    const bookingId = await page.locator("nav").nth(1).locator("span").nth(1).textContent();
    const bookingIdLetter = bookingId.split("-")[0].toLowerCase();
    const eventName = await page.locator("h1").textContent();
    const eventNameLetter = eventName.split("")[0].toLowerCase();

    expect(bookingIdLetter).toBe(eventNameLetter);

    // Step 5
    await page.getByRole("button", {name: "Check eligibility for refund?"}).click();

    await expect(page.getByTestId("refund-spinner")).toBeVisible();
    await expect(page.getByTestId("refund-spinner")).not.toBeVisible({timeout: 6000});

    // Step 6
    await expect(page.locator("#refund-result")).toBeVisible();
    const refundText = await page.locator("#refund-result").textContent();

    console.log(refundText);
    expect(refundText).toContain("Group bookings (3 tickets) are non-refundable");


});