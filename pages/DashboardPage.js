const { expect } = require('@playwright/test');

class DashboardPage {

    constructor ( page ) {

        this.page = page;

        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    }
    async verifyDashboardHeader(){

        await expect(this.dashboardHeading).toHaveText('Dashboard');
    }
}
module.exports = { DashboardPage };
