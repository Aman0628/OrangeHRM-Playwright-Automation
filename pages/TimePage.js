const { expect } = require('@playwright/test');

class TimePage {
    constructor(page) {
        this.page = page;
        this.timesheetButton = page.getByRole('button', { name: 'Timesheets' }).first();
        this.pageContent = page.locator('.oxd-layout-context');
    }

    async verifyPageHeader() {
        await expect(this.page).toHaveURL(/\/time\/viewEmployeeTimesheet/);
        await expect(this.timesheetButton).toBeVisible();
        await expect(this.pageContent).toBeVisible();
    }
}

module.exports = { TimePage };
