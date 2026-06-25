const {test, expect} = require('@playwright/test');
const {pageLogin} = require('../helpers/login');

test('Booking Event', async ({page})=> {

    
    const DateNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Get date for one week from now
    const meridian = DateNow.getHours() >= 12 ? "P" : "A"; // Determine AM or PM
    const eventTitle = `Test Event ${DateNow}`;
    console.log(DateNow.getMonth());
    console.log(DateNow.getDate());
    console.log(DateNow.getFullYear());
    console.log(DateNow.getHours());
    console.log(DateNow.getMinutes());
    console.log(meridian);
    
    if (DateNow.getHours() > 12) {
        DateNow.setHours(DateNow.getHours() - 12); // Convert to 12-hour format
    }


    
   
    await pageLogin(page, "mrdcs92@gmail.com", "19922dst!taN19922");

    await page.getByRole('link', { name: 'Browse Events →' }).click();
    await page.getByRole("link", {name: "Add New Event"}).click();

    await page.locator("#event-title-input").fill(eventTitle);

    await page.locator("#admin-event-form textarea").fill("This is a test event created by Playwright Automation");

    await page.getByLabel("City").fill("Glendale");

    await page.getByLabel("Venue").fill("Glendale Convention Center");

    await page.getByLabel("Event Date & Time").click(); // Click to open the date picker

    await page.getByLabel("Event Date & Time").pressSequentially(String(DateNow.getMonth() + 1) + String(DateNow.getDate()) + String(DateNow.getFullYear()));
    await page.getByLabel("Event Date & Time").press("Tab"); // Move to time input
    await page.getByLabel("Event Date & Time").pressSequentially(String(DateNow.getHours()) + String(DateNow.getMinutes()));
    await page.getByLabel("Event Date & Time").pressSequentially(meridian); // Press Enter to close the date picker

    await page.getByLabel("Price ($)").fill("100");

    await page.getByLabel("Total Seats").fill("50");

    await page.locator("#add-event-btn").click();

    await expect(page.getByText("Event created!")).toBeVisible();

    await page.locator("#nav-events").click();

    await expect(page.getByTestId("event-card").first()).toBeVisible({timeout: 5000});
    const eventCards = page.getByTestId("event-card");

    await expect(eventCards.filter({hasText: eventTitle})).toBeVisible();
    const newlyMadeCard = eventCards.filter({hasText: eventTitle});

    const seatsAvailable = await eventCards.filter({hasText: eventTitle}).locator("span").nth(3).textContent();
    const seatsRemaining = seatsAvailable.split(" ")[0]; // Extract the number from "X seats available"

    expect(seatsRemaining).toBe("50");  

    await newlyMadeCard.getByTestId("book-now-btn").click();

    await expect(page.locator("#ticket-count")).toBeVisible();
    await expect(page.locator("#ticket-count")).toHaveText("1");

    await page.getByLabel("Full Name").fill("John Doe");

    await page.locator("#customer-email").fill("mrdcs92@gmail.com");

    await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");

    await page.locator(".confirm-booking-btn").click();

    await expect(page.locator(".booking-ref").first()).toBeVisible();

    const bookingRef = await page.locator(".booking-ref").first().textContent();

    const trimmedRef = bookingRef.toString().trim();

    console.log("Booking Reference: " + trimmedRef);

    await page.getByRole("button", {name: "View My Bookings"}).click();

    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");

    const bookingCards = page.locator("#booking-card");

    await expect(bookingCards.first()).toBeVisible();

    await expect(bookingCards.filter({hasText: trimmedRef})).toBeVisible();

    await expect(bookingCards.filter({hasText: trimmedRef})).toContainText(eventTitle);

    await page.locator("#nav-events").click();

    await expect(page.getByTestId("event-card").first()).toBeVisible({timeout: 5000});

    console.log(eventTitle);

    await expect(page.getByTestId("event-card").filter({hasText: eventTitle})).toBeVisible();

    const NewSeatsAvailable = await page.getByTestId("event-card").filter({hasText: eventTitle}).getByText("seats available").textContent();

    console.log("Seats Available Text: " + NewSeatsAvailable);

    const NewSeatsRemaining = NewSeatsAvailable.split(" ")[0]; // Extract the number from "X seats available"

    console.log("Seats Remaining: " + NewSeatsRemaining);
    await page.pause();

    await expect(page.getByTestId("event-card").filter({ hasText: eventTitle })).toHaveText(/49 seats available/, { timeout: 10000 });
    expect(NewSeatsRemaining).toBe("49");

    

    

});