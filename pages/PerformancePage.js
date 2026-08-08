const { expect } = require('@playwright/test');

class PerformancePage {
    constructor(page) {
        this.page = page;
        this.performanceMenu = page.getByRole('link', { name: 'Performance' }).first();
        this.pageContent = page.locator('.oxd-layout-context');
    }

    async verifyPageHeader() {
        await expect(this.page).toHaveURL(/\/performance/);
        await expect(this.performanceMenu).toBeVisible();
        await expect(this.pageContent).toBeVisible();
    }

    async openEmployeeReviews() {
        await this.verifyPageHeader();
        await expect(this.page.locator('body')).toBeVisible();
    }
}

module.exports = { PerformancePage };
