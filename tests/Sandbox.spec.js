const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('../helpers/ApiUtils');
const { pageLogin } = require('../helpers/login');

const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo',    category: 'Conference',  eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

let response;



test("Sandbox Visibility Six Events", async ({page}) => {

    await pageLogin(page, "mrdcs92@gmail.com", "19922dst!taN19922");

    await page.route("**/api/events**", 
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(SIX_EVENTS_RESPONSE);
            route.fulfill({
                response: response,
                body: body,
                contentType: 'application/json',
                status: 200
            });
        }
    );

    await page.getByRole('link', { name: 'Browse Events →' }).click();
    await page.waitForResponse("**/api/events**");

    await expect(page.getByTestId("event-card").first()).toBeVisible({timeout: 5000});
    const eventCards = await page.getByTestId("event-card");

    expect(await eventCards.count()).toBe(6);

    const sandboxLabel = page.getByText(/sandbox holds up to/i);
    await expect(sandboxLabel).toBeVisible();
    await expect(sandboxLabel).toContainText("9 bookings");

    await page.pause();

})

test("Sandbox Visibility Four Events", async ({page}) => {

    await pageLogin(page, "mrdcs92@gmail.com", "19922dst!taN19922");

    await page.route("**/api/events**", 
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(FOUR_EVENTS_RESPONSE);
            route.fulfill({
                response: response,
                body: body,
                contentType: 'application/json',
                status: 200
            });
        }
    );

    await page.getByRole('link', { name: 'Browse Events →' }).click();
    await page.waitForResponse("**/api/events**");

    await expect(page.getByTestId("event-card").first()).toBeVisible({timeout: 5000});
    const eventCards = await page.getByTestId("event-card");

    expect(await eventCards.count()).toBe(4);

    const sandboxLabel = page.getByText(/sandbox holds up to/i);
    await expect(sandboxLabel).toBeHidden();
    //await expect(sandboxLabel).toContainText("9 bookings");

    await page.pause();



})
