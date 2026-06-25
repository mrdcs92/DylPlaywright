class LoginPage {

    constructor(page) {

        this.page = page;
        this.signInButton = page.locator("#login");
        this.userEmail = page.locator("#userEmail");
        this.userPass = page.locator("#userPassword");

    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password) {
        await this.userEmail.fill(username);
        await this.userPass.fill(password);
        await this.signInButton.click();

    }

}

module.exports = {LoginPage};