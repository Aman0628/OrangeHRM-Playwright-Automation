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
        await this.page.getByRole('link', { name: moduleName }).click();
    }

    async logout() {
        await this.userDropdown.click();
        await this.logoutButton.click();
    }
}
module.exports = { DashboardPage };
