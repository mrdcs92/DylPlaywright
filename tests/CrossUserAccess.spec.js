const { test, expect } = require('@playwright/test');

const loginPayLoad = { email: "filler@yahoo.com", password: "fillerpass" }
const gmailPayload = { email: "filler@gmail.com", password: "fillerpass" }

async function loginAs(page, user) {
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder('you@email.com').fill(user.email);
    await page.getByLabel('Password').fill(user.password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test("Cross-User Booking Access Denied", async ({ page, request }) => {

    //Step 1 - Login as Yahoo user via API
    const loginResponse = await request.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login", {
        data: loginPayLoad
    });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    const yahooToken = loginResponseJson.token;

    //Step 2 - Fetch events via API to get a valid event ID
    const eventResponse = await request.get("https://api.eventhub.rahulshettyacademy.com/api/events", {
        headers: {
            'Authorization': 'Bearer ${yahooToken}'
        }
    });
    expect(eventResponse.ok()).toBeTruthy();
    const eventResponseJson = await eventResponse.json();
    const eventId = eventResponseJson.data[0].id;

    //Step 3 - Create a booking via API as Yahoo user
    const bookingResponse = await request.post("https://api.eventhub.rahulshettyacademy.com/api/bookings", {
        headers: {
            'Authorization': 'Bearer ${yahooToken}',
            data: {
                eventId,
                customerName: 'Yahoo User',
                customerEmail: loginPayLoad.email,
                customerPhone: '9999999999',
                quantity: 1,
            }
        }
    });
    expect(bookingResponse.ok()).toBeTruthy();
    const yahooBookingId = (await bookingResponse.json()).data.id;
    console.log('Yahoo booking id: ${yahooBookingId}');

    //Step 4 - Login as Gmail user via API
    await loginAs(page, gmailPayload);

    //Step 5 - Navigate directly to Yahoo's booking URL as Gmail user 
    await page.goto("https://eventhub.rahulshettyacademy.com/bookings/${yahooBookingId}", { waitUntil: 'networkidle' });

    //Step 6 - Validate Access Denied
    await expect(page.getByText('Access Denied')).toBeVisible();
    await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();


})

