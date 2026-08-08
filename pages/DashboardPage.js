const { expect } = require('@playwright/test');

class DashboardPage {

    constructor ( page ) {

        this.page = page;

        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
        this.userDropdown = page.locator('.oxd-userdropdown');
        this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
    }

    async verifyDashboardHeader(){
        await expect(this.dashboardHeading).toHaveText('Dashboard');
    }

    async navigateToModule(moduleName) {
        // Scope to the sidebar's main menu items (.oxd-main-menu-item) —
        // an unscoped getByRole('link', { name }) also substring-matches
        // top-bar sub-tabs that appear once inside a module (e.g. "Leave"
        // matches "My Leave" / "Leave List" / "Assign Leave" too).
        await this.page.locator('.oxd-main-menu-item', { hasText: moduleName }).click();
    }

    async logout() {
        await this.userDropdown.click();
        await this.logoutButton.click();
    }
}
module.exports = { DashboardPage };
