// @ts-check
const { test, expect } = require('@playwright/test');


test('login as admin', async ({ page }) => {
  const url = 'https://dev-app.creativelysquared.com/';
  const emailLocator = page.locator("xpath=//input[@name='email']");
  const passwordLocator = page.locator("xpath=//input[@name='password']");
  const loginBtn = page.locator("xpath=//button[@type='submit' and contains(normalize-space(), 'Login')]");


  await page.goto(url);
  await emailLocator.fill('volo');
  await passwordLocator.fill('khmil');
  await loginBtn.click();
})