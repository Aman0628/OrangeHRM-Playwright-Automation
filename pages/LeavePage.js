const { expect } = require('@playwright/test');

class LeavePage {
    constructor(page) {
        this.page = page;
        this.leaveListHeader = page.getByRole('heading', { name: 'Leave List' });
        this.leaveTable = page.locator('.oxd-table-filter');

        // Filter panel locators (visible by default at the top of Leave List).
        // Note: this panel uses a "Search" button (same pattern as Admin/PIM),
        // not "Apply" — corrected after verifying against a real test run.
        this.fromDateInput = page.locator('.oxd-date-input input').first();
        this.toDateInput = page.locator('.oxd-date-input input').nth(1);
        this.leaveTypeDropdown = page.locator('.oxd-select-text').first();
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });

        this.tableRows = page.locator('.oxd-table-card');
        this.noRecordsFound = page.getByText('No Records Found');
    }

    async verifyPageHeader() {
        await expect(this.page).toHaveURL(/\/leave\/viewLeaveList/);
        await expect(this.leaveListHeader).toBeVisible();
        await expect(this.leaveTable).toBeVisible();
    }

    /**
     * The Leave List filter panel is shown by default (not toggled), so
     * "opening filters" really means asserting the filter fields are
     * present and usable. Previously this just re-checked page.body.
     */
    async openFilters() {
        await this.verifyPageHeader();
        await expect(this.fromDateInput).toBeVisible();
        await expect(this.toDateInput).toBeVisible();
        await expect(this.leaveTypeDropdown).toBeVisible();
        await expect(this.searchButton).toBeVisible();
    }

    /**
     * Apply the current filter selection and assert the list updates
     * (rows or "No Records Found"). Uses a UI-based retry rather than
     * waiting on a specific API call, since that call shape can't be
     * verified without live network access.
     */
    async applyFilters() {
        await this.searchButton.click();

        await expect(async () => {
            const rowCount = await this.tableRows.count();
            if (rowCount === 0) {
                await expect(this.noRecordsFound.first()).toBeVisible({ timeout: 1000 });
            } else {
                await expect(this.tableRows.first()).toBeVisible({ timeout: 1000 });
            }
        }).toPass({ timeout: 15000 });
    }
}

module.exports = { LeavePage };
