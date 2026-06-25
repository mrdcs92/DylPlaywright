import { Locator, Page } from "@playwright/test";

export class DashBoardPage {

    page: Page;
    products: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");

    }

    async searchProductAddCart(productName: string) {
        await this.productsText.first().waitFor({ state: 'visible' });
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        console.log(count);
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToOrders() {
        await this.orders.click();
    }


    async navigateToCart() {
        await this.cart.click();
    }

}
