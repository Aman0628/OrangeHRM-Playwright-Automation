const { expect } = require('@playwright/test');

class MyInfoPage {
    constructor(page) {
        this.page = page;
        this.personalDetailsTab = page.getByRole('link', { name: 'Personal Details' }).first();
        this.employeeContent = page.locator('.orangehrm-edit-employee-content');
    }

    async verifyPageHeader() {
        await expect(this.page).toHaveURL(/\/pim\/viewPersonalDetails/);
        await expect(this.personalDetailsTab).toBeVisible();
        await expect(this.employeeContent).toBeVisible();
    }

    async openAttachmentsTab() {
        await this.verifyPageHeader();
        await expect(this.page.locator('body')).toBeVisible();
    }
}

module.exports = { MyInfoPage };
