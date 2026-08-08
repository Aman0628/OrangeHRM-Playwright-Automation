const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { AdminPage } = require('../pages/AdminPage');
const { PIMPage } = require('../pages/PIMPage');
const { LeavePage } = require('../pages/LeavePage');
const { RecruitmentPage } = require('../pages/RecruitmentPage');
const { MyInfoPage } = require('../pages/MyInfoPage');
const { PerformancePage } = require('../pages/PerformancePage');
const { BuzzPage } = require('../pages/BuzzPage');
const { TimePage } = require('../pages/TimePage');

class POManager {

    constructor(page) {
        this.page = page;

        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.adminPage = new AdminPage(page);
        this.pimPage = new PIMPage(page);
        this.leavePage = new LeavePage(page);
        this.recruitmentPage = new RecruitmentPage(page);
        this.myInfoPage = new MyInfoPage(page);
        this.performancePage = new PerformancePage(page);
        this.buzzPage = new BuzzPage(page);
        this.timePage = new TimePage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getAdminPage() {
        return this.adminPage;
    }

    getPIMPage() {
        return this.pimPage;
    }

    getLeavePage() {
        return this.leavePage;
    }

    getRecruitmentPage() {
        return this.recruitmentPage;
    }

    getMyInfoPage() {
        return this.myInfoPage;
    }

    getPerformancePage() {
        return this.performancePage;
    }

    getTimePage() {
        return this.timePage;
    }

    getBuzzPage() {
        return this.buzzPage;
    }
}

module.exports = { POManager };
