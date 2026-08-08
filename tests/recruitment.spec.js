const { test } = require('@playwright/test');
const { describeModule } = require('../utils/moduleLogin');

describeModule('Recruitment module', (getPoManager) => {
  test('Recruitment - open candidates list', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const recruitmentPage = poManager.getRecruitmentPage();

    await dashboardPage.navigateToModule('Recruitment');
    await recruitmentPage.verifyPageHeader();
  });

  test('Recruitment - open add candidate form', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const recruitmentPage = poManager.getRecruitmentPage();

    await dashboardPage.navigateToModule('Recruitment');
    await recruitmentPage.openAddCandidateForm();
  });
});
