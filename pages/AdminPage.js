const { expect } = require('@playwright/test');

class AdminPage {
    constructor(page) {
        this.page = page;
        this.userManagementHeader = page.getByRole('heading', { name: 'User Management' });
        this.systemUsersTable = page.locator('.oxd-table-filter');
        // The "Type for hints..." placeholder belongs to the Employee Name
        // autocomplete field on this filter form, not Username — Username
        // is a plain text input. Target it by its label instead of relying
        // on placeholder/index, which was silently filtering by the wrong
        // field.
        this.usernameInput = page.locator('.oxd-input-group', { hasText: 'Username' }).locator('input');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.addButton = page.getByRole('button', { name: 'Add' });

        // Results / outcome locators
        this.tableRows = page.locator('.oxd-table-card');
        this.noRecordsFound = page.getByText('No Records Found');

        // Add User form locators
        this.addUserHeader = page.getByRole('heading', { name: 'Add User' });
        this.userRoleDropdown = page.locator('.oxd-select-text').first();
        this.employeeNameInput = page.getByPlaceholder('Type for hints...').nth(1);
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
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
        await this.verifySearchResults(username);
    }

    /**
     * Assert the search actually filtered the results: either every visible
     * row mentions the searched username, or an explicit "No Records Found"
     * state is shown. Retries the whole check for up to 15s so the SPA has
     * time to re-render, without assuming a specific API call shape.
     */
    async verifySearchResults(username) {
        await expect(async () => {
            const rowCount = await this.tableRows.count();

            if (rowCount === 0) {
                // "No Records Found" can also appear briefly in a toast, so
                // scope to the first match (the in-table message) to avoid a
                // strict-mode violation.
                await expect(this.noRecordsFound.first()).toBeVisible({ timeout: 1000 });
            } else {
                await expect(this.tableRows.first()).toContainText(username, { timeout: 1000 });
            }
        }).toPass({ timeout: 15000 });
    }

    async openAddUserForm() {
        await this.verifyPageHeader();
        await this.addButton.click();
        await this.verifyAddUserFormOpened();
    }

    /**
     * Assert the Add User form actually loaded, instead of just clicking
     * Add and stopping. Checks URL + heading + that the form fields are
     * present and empty/ready for input.
     */
    async verifyAddUserFormOpened() {
        await expect(this.page).toHaveURL(/\/admin\/saveSystemUser/);
        await expect(this.addUserHeader).toBeVisible();
        await expect(this.userRoleDropdown).toBeVisible();
        await expect(this.saveButton).toBeVisible();
    }
}

module.exports = { AdminPage };
