const { test } = require('@playwright/test');
const { describeModule } = require('../utils/moduleLogin');

describeModule('Dashboard module navigation', (getPoManager) => {
  test('P1 - Admin module opens successfully', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const adminPage = poManager.getAdminPage();

    await dashboardPage.navigateToModule('Admin');
    await adminPage.verifyPageHeader();
  });

  test('P1 - PIM module opens successfully', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const pimPage = poManager.getPIMPage();

    await dashboardPage.navigateToModule('PIM');
    await pimPage.verifyPageHeader();
  });

  test('P1 - Leave module opens successfully', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const leavePage = poManager.getLeavePage();

    await dashboardPage.navigateToModule('Leave');
    await leavePage.verifyPageHeader();
  });

  test('P1 - Recruitment module opens successfully', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const recruitmentPage = poManager.getRecruitmentPage();

    await dashboardPage.navigateToModule('Recruitment');
    await recruitmentPage.verifyPageHeader();
  });

  test('P1 - My Info module opens successfully', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const myInfoPage = poManager.getMyInfoPage();

    await dashboardPage.navigateToModule('My Info');
    await myInfoPage.verifyPageHeader();
  });

  test('P1 - Performance module opens successfully', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const performancePage = poManager.getPerformancePage();

    await dashboardPage.navigateToModule('Performance');
    await performancePage.verifyPageHeader();
  });

  test('P1 - Buzz module opens successfully', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const buzzPage = poManager.getBuzzPage();

    await dashboardPage.navigateToModule('Buzz');
    await buzzPage.verifyPageHeader();
  });
});
