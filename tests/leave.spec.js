const { test } = require('@playwright/test');
const { describeModule } = require('../utils/moduleLogin');

describeModule('Leave module', (getPoManager) => {
  test('Leave - open leave list', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const leavePage = poManager.getLeavePage();

    await dashboardPage.navigateToModule('Leave');
    await leavePage.verifyPageHeader();
  });

  test('Leave - filter panel fields are present and usable', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const leavePage = poManager.getLeavePage();

    await dashboardPage.navigateToModule('Leave');
    await leavePage.openFilters();
  });

  test('Leave - applying filters updates the leave list', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const leavePage = poManager.getLeavePage();

    await dashboardPage.navigateToModule('Leave');
    await leavePage.openFilters();
    await leavePage.applyFilters();
  });
});
