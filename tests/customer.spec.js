// @ts-check
const { test, expect } = require('@playwright/test');
const { Customer } = require('../pageObject/customer.page');
const { Login } = require('../pageObject/login.page');
const { users } = require('../testData/loginData');

test.describe('verify login functionality', () => {
  let login;
  let customer;
  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    customer = new Customer(page);
    await login.goto();
    await login.clickAcceptButton();
    await login.fillEmailField(users[1].email);
    await login.fillPasswordField(users[1].password);
    await login.clickLoginButton();
  });

  test('create project with Original Creative category', async ({ page }) => {

    await customer.startNewProject();
    await customer.selectProjectCategory();
    await customer.clickNextBtn();
    await customer.fillOverviewSection();
    await customer.selectCreativeStyle();
    await customer.fillProductSection();
    for (let i = 0; i < 3; i++) {
      await customer.uploadFile();
      await page.waitForTimeout(3000);
    }
    const imageAmount = (await customer.allUploadedImages.all()).length;
    expect(imageAmount).toBe(3)
    await customer.setDeliverbles();
    await customer.fillLogistics();
    await customer.goToSummary();
    await page.waitForTimeout(10000);
    await customer.deleteProject();
  })

  test.only('remove projects', async ({ page }) => {
    await page.pause();
    for (let i = 1; i < 15; i++) {
      await page.locator(`xpath=//p[contains (text(), 'projectTitle')]/parent::p/parent::section/preceding-sibling::div/parent::div/parent::section/div[${i}]`).click();
      await customer.deleteProject();
    }
  })
})


