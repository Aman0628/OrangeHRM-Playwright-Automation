const { expect } = require('@playwright/test');

class LeavePage {
    constructor(page) {
        this.page = page;
        this.leaveListHeader = page.getByRole('heading', { name: 'Leave List' });
        this.leaveTable = page.locator('.oxd-table-filter');
    }

    async verifyPageHeader() {
        await expect(this.page).toHaveURL(/\/leave\/viewLeaveList/);
        await expect(this.leaveListHeader).toBeVisible();
        await expect(this.leaveTable).toBeVisible();
    }

    async openFilters() {
        await this.verifyPageHeader();
        await expect(this.page.locator('body')).toBeVisible();
    }
}

module.exports = { LeavePage };