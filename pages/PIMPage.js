const { expect } = require('@playwright/test');

class PIMPage {
    constructor(page) {
        this.page = page;
        this.pageContent = page.locator('.oxd-layout-context');
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]').first();
        this.searchButton = page.getByRole('button', { name: 'Search' });
    }

    async verifyPageHeader() {
        await expect(this.page).toHaveURL(/\/pim\/viewEmployeeList/);
        await expect(this.pageContent).toBeVisible();
        await expect(this.addButton).toBeVisible();
    }

    async openAddEmployeeForm() {
        await this.verifyPageHeader();
        await this.addButton.click();
    }

    async searchEmployee(name) {
        await this.verifyPageHeader();
        await this.employeeNameInput.fill(name);
        await this.searchButton.click();
    }
}

module.exports = { PIMPage };
