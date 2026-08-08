const { test } = require('@playwright/test');
const { describeModule } = require('../utils/moduleLogin');

describeModule('My Info module', (getPoManager) => {
  test('My Info - open personal details', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const myInfoPage = poManager.getMyInfoPage();

    await dashboardPage.navigateToModule('My Info');
    await myInfoPage.verifyPageHeader();
  });

  test('My Info - open attachments tab', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const myInfoPage = poManager.getMyInfoPage();

    await dashboardPage.navigateToModule('My Info');
    await myInfoPage.openAttachmentsTab();
  });
});
