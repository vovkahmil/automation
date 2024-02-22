import { test as base } from '@playwright/test';

import { Login } from './pageObject/login.page';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new Login(page));
  },
});
