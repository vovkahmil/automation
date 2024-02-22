import { test, expect } from '@playwright/test';
import { setupBeforeEachCustomer } from '../setup/setup';
import { instantiatePageObjects } from '../pageObject/pageObjects';

test.describe('verify login functionality', () => {
  test.beforeEach(async ({ page }) => {
    await setupBeforeEachCustomer({ page });
  });

  test.only('create project with Original Creative category', async ({ page }) => {
    const { customer } = instantiatePageObjects(page);
    await page.pause();
    await customer.startNewProject();
    await customer.selectProjectCategory();
    await customer.clickNextBtn();
    await customer.fillOverviewSection();
    await customer.selectCreativeStyle();
    await customer.fillProductSection();

    for (let i = 0; i < 3; i += 1) {
      await customer.uploadFile();
    }
    const imageAmount = (await customer.allUploadedImages.all()).length;
    expect(imageAmount).toBe(3);
    await customer.setDeliverbles();
    await customer.fillLogistics();
    await customer.goToSummary();
    await page.waitForTimeout(10000);
    await customer.deleteProject();
  });

  test('remove projects', async ({ page }) => {
    const { customer } = instantiatePageObjects(page);
    await page.pause();
    for (let i = 1; i < 15; i += 1) {
      await page.locator(`xpath=//p[contains (text(), 'projectTitle')]/parent::p/parent::section/preceding-sibling::div/parent::div/parent::section/div[${i}]`).click();
      await customer.deleteProject();
    }
  });
});
