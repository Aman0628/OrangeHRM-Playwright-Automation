const { expect } = require('@playwright/test');

class LoginPage {

    constructor(page) {
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidCredentialsError = page.getByText('Invalid credentials');
        this.usernameLabel = page.getByText('Username');
    }

    async navigate() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        // The shared public demo instance can be slow to finish rendering
        // the login form even after `goto` resolves; wait for the
        // Username field explicitly (with its own generous timeout) rather
        // than letting a slow render eat into the caller's action timeout.
        await this.username.waitFor({ state: 'visible', timeout: 30_000 });
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async verifyInvalidCredentialsError() {
        await expect(this.invalidCredentialsError).toBeVisible();
    }

    async verifyLoginPageVisible() {
        await expect(this.username).toBeVisible();
        await expect(this.password).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
}
module.exports = { LoginPage };
