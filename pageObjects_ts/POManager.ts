import { DashBoardPage } from "./DashBoardPage";
import { LoginPage } from "./LoginPage";
import { CartPage } from "./CartPage";
import { OrdersReviewPage } from "./OrdersReviewPage";
import { OrdersHistoryPage } from "./OrdersHistoryPage";
import { Page } from "@playwright/test";

export class POManager {

    page: Page;
    loginPage: LoginPage;
    dashBoardPage: DashBoardPage;
    cartPage: CartPage;
    ordersReviewPage: OrdersReviewPage;
    ordersHistoryPage: OrdersHistoryPage;

    constructor(page:Page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);

    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashBoardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

}