const { expect } = require('@playwright/test');

class AdminPage {
    constructor(page) {
        this.page = page;
        this.userManagementHeader = page.getByRole('heading', { name: 'User Management' });
        this.systemUsersTable = page.locator('.oxd-table-filter');
        this.usernameInput = page.locator('input[placeholder="Type for hints..."]').first();
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.addButton = page.getByRole('button', { name: 'Add' });
    }

    async verifyPageHeader() {
        await expect(this.page).toHaveURL(/\/admin\/viewSystemUsers/);
        await expect(this.userManagementHeader).toBeVisible();
        await expect(this.systemUsersTable).toBeVisible();
    }

    async searchUser(username) {
        await this.verifyPageHeader();
        await this.usernameInput.fill(username);
        await this.searchButton.click();
    }

    async openAddUserForm() {
        await this.verifyPageHeader();
        await this.addButton.click();
    }
}

module.exports = { AdminPage };