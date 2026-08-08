const { test, expect } = require('../fixtures/authFixture');
const loginData = require('../test.data/login.json');

const validCase = loginData.find(c => c.expected === 'success');
const invalidCase = loginData.find(c => c.expected === 'failure');

test('P0 - valid login should open the dashboard', async ({ page, poManager }) => {
  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();

  await loginPage.navigate();
  await loginPage.login(validCase.username, validCase.password);
  await dashboardPage.verifyDashboardHeader();
});

test('P0 - invalid login should show an error message', async ({ page, poManager }) => {
  const loginPage = poManager.getLoginPage();

  await loginPage.navigate();
  await loginPage.login(invalidCase.username, invalidCase.password);
  await loginPage.verifyInvalidCredentialsError();
});

test('P0 - logout should return to the login screen', async ({ authenticatedPage, poManager }) => {
  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();

  await dashboardPage.logout();
  await loginPage.verifyLoginPageVisible();
});
