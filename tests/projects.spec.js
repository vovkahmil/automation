// @ts-check
const { test, expect } = require('@playwright/test');
const { Login } = require('../pageObject/login.page');
const { Navigation } = require('../pageObject/Navigation.js');
const { Projects } = require('../pageObject/Projects');
const { users } = require('../testData/loginData');

test.describe('verify login functionality', () => {
  let login;
  let navigation;
  let projects;

  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    navigation = new Navigation(page);
    projects = new Projects(page);
    await login.goto();
    await login.clickAcceptButton();
    await login.fillEmailField(users[0].email);
    await login.fillPasswordField(users[0].password);
    await login.clickLoginButton();
  });

  test('remove in progress project', async ({ page }) => {
    await navigation.goToProjectPage();
    await projects.clickInProgressTab();

    const projectsAmount = await projects.getProjectAmount();

    await projects.openLastProject();
    await projects.clickDeleteIcon();
    await projects.fillDeleteInput();
    await projects.clickDeleteProjectButton();

    await projects.clickInProgressTab();
    await expect(projects.projectsTile).toHaveCount(projectsAmount - 1)
  })

})


