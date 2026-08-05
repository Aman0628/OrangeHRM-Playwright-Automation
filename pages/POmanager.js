const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage')

class POManager {

    constructor ( page ) {

        this.page = page ;

        this.loginPage = new LoginPage( page );
        this.dashboardPage = new DashboardPage( page );
    }
    
    getLoginPage () {
        return this.loginPage;

    }
    getDashboardPage () {
        return this.dashboardPage;

    }
 }
 module.exports = { POManager };
