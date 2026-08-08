const { test } = require('@playwright/test');
const { describeModule } = require('../utils/moduleLogin');

describeModule('Performance module', (getPoManager) => {
  test('Performance - open performance page', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const performancePage = poManager.getPerformancePage();

    await dashboardPage.navigateToModule('Performance');
    await performancePage.verifyPageHeader();
  });

  test('Performance - open employee reviews', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const performancePage = poManager.getPerformancePage();

    await dashboardPage.navigateToModule('Performance');
    await performancePage.openEmployeeReviews();
  });
});
