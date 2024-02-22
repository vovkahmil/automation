import { test, expect } from '@playwright/test';
import { setupBeforeEachAdmin } from '../setup/setup';
import { instantiatePageObjects } from '../pageObject/pageObjects';

test.describe('verify login functionality', () => {
  test.beforeEach(async ({ page }) => {
    await setupBeforeEachAdmin({ page });
  });

  test('remove in progress project', async ({ page }) => {
    const { navigation, projects } = instantiatePageObjects(page);

    await navigation.goToProjectPage();
    await projects.clickInProgressTab();

    const projectsAmount = await projects.getProjectAmount();

    await projects.openLastProject();
    await projects.clickDeleteIcon();
    await projects.fillDeleteInput();
    await projects.clickDeleteProjectButton();

    await projects.clickInProgressTab();
    await expect(projects.projectsTile).toHaveCount(projectsAmount - 1);
  });
});
