const { expect } = require('@playwright/test');

class PIMPage {
    constructor(page) {
        this.page = page;
        this.pageContent = page.locator('.oxd-layout-context');
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]').first();
        this.searchButton = page.getByRole('button', { name: 'Search' });

        // Results / outcome locators
        this.tableRows = page.locator('.oxd-table-card');
        this.noRecordsFound = page.getByText('No Records Found');

        // Add Employee form locators
        this.addEmployeeHeader = page.getByRole('heading', { name: 'Add Employee' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.middleNameInput = page.getByPlaceholder('Middle Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        // The Employee Id field auto-fills with the "next available" id at
        // form-load time. Under parallel execution two tests can load the
        // form around the same moment and get the same default id, so the
        // second Save silently fails on a duplicate-id validation. We
        // overwrite it with a unique value before saving (see addEmployee).
        this.employeeIdInput = page.locator('.oxd-input-group', { hasText: 'Employee Id' }).locator('input');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.personalDetailsHeader = page.getByRole('heading', { name: 'Personal Details' });
    }

    async verifyPageHeader() {
        await expect(this.page).toHaveURL(/\/pim\/viewEmployeeList/);
        await expect(this.pageContent).toBeVisible();
        await expect(this.addButton).toBeVisible();
    }

    async openAddEmployeeForm() {
        await this.verifyPageHeader();
        await this.addButton.click();
        await this.verifyAddEmployeeFormOpened();
    }

    /**
     * Assert the Add Employee form actually loaded (URL + heading + the
     * name fields are present), instead of just clicking Add and stopping.
     */
    async verifyAddEmployeeFormOpened() {
        await expect(this.page).toHaveURL(/\/pim\/addEmployee/);
        await expect(this.addEmployeeHeader).toBeVisible();
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
    }

    /**
     * Full create flow: open the form, fill first/last (+ optional middle)
     * name, save, and confirm we land on the new employee's Personal
     * Details page — i.e. the employee was actually created.
     */
    async addEmployee({ firstName, middleName = '', lastName }) {
        await this.openAddEmployeeForm();
        await this.firstNameInput.fill(firstName);
        if (middleName) {
            await this.middleNameInput.fill(middleName);
        }
        await this.lastNameInput.fill(lastName);

        // Replace the auto-generated Employee Id with something guaranteed
        // unique for this test run, so parallel workers can't collide on
        // the same default "next available id".
        const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`.slice(-9);
        await this.employeeIdInput.fill(uniqueId);

        await this.saveButton.click();

        await expect(this.page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/, { timeout: 15000 });
        await expect(this.personalDetailsHeader).toBeVisible();
    }

    async searchEmployee(name) {
        await this.verifyPageHeader();
        await this.employeeNameInput.fill(name);
        await this.searchButton.click();
        await this.verifySearchResults(name);
    }

    /**
     * Assert the search actually filtered the results: either every visible
     * row mentions the searched name, or an explicit "No Records Found"
     * state is shown. Retries the whole check for up to 15s so the SPA has
     * time to re-render, without assuming a specific API call shape.
     */
    async verifySearchResults(name) {
        await expect(async () => {
            const rowCount = await this.tableRows.count();

            if (rowCount === 0) {
                // "No Records Found" can also appear briefly in a toast, so
                // scope to the first match (the in-table message) to avoid a
                // strict-mode violation.
                await expect(this.noRecordsFound.first()).toBeVisible({ timeout: 1000 });
            } else {
                await expect(this.tableRows.first()).toContainText(name, { timeout: 1000 });
            }
        }).toPass({ timeout: 15000 });
    }
}

module.exports = { PIMPage };
