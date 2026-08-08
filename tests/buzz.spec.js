const { test } = require('@playwright/test');
const { describeModule } = require('../utils/moduleLogin');

describeModule('Buzz module', (getPoManager) => {
  test('Buzz - open buzz feed', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const buzzPage = poManager.getBuzzPage();

    await dashboardPage.navigateToModule('Buzz');
    await buzzPage.verifyPageHeader();
  });

  test('Buzz - open post composer', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const buzzPage = poManager.getBuzzPage();

    await dashboardPage.navigateToModule('Buzz');
    await buzzPage.openPostComposer();
  });
});
