import { test, expect } from '@playwright/test';
import { instantiatePageObjects } from '../pageObject/pageObjects';
import { users, config } from '../config';

test.describe('verify login functionality', () => {
  let login;

  test.beforeEach(async ({ page }) => {
    const pageObjects = instantiatePageObjects(page);
    login = pageObjects.login;

    await login.goto();
    await login.clickAcceptButton();
  });

  test('should elements to be display on login page', async () => {
    await expect(login.emailLocator).toBeVisible();
    await expect(login.passwordLocator).toBeVisible();
    await expect(login.loginButton).toBeVisible();
    await expect(login.forgotPasswordLinkLocator).toBeVisible();
  });

  test.only('should navigate to password reset page when "Forgot Password" link is clicked', async ({ page }) => {
    const expectedUrl = `${config.baseURL}/forgot-password`;

    await login.clickForgotPasswordLink();

    await expect(page).toHaveURL(expectedUrl);
  });

  for (const user of users) {
    test(`verify login as ${user.role}`, async ({ page }) => {
      await login.fillEmailField(user.email);
      await login.fillPasswordField(user.password);
      await login.clickLoginButton();

      if (user.role === 'Admin') {
        await expect(page).toHaveURL(/.*dashboard/);
        await expect(login.mainTitle).toHaveText('Let’s sort your day out');
      } else {
        await expect(page).toHaveURL(/.*projects/);
        await expect(login.mainTitle).toBeVisible();
        await expect(login.mainTitle).toHaveText('Your projects');
      }
    });
  }

  test('click on Login button with empty fields', async () => {
    const validationMessage = 'This is required field';
    await login.clickLoginButton();

    await expect(login.emailLabelLocator).toHaveText(validationMessage);
    await expect(login.passwordLabelLocator).toHaveText(validationMessage);
  });

  for (const user of users) {
    test(`click Forgot password and verify success message for ${user.role}`, async () => {
      await login.clickForgotPasswordLink();
      await login.fillEmailField(user.email);
      await login.clickResetPasswordButton();

      await expect(login.emailConfirmationMessage).toHaveText(user.email);
    });
  }

  test('should display error message on invalid login attempt - incorrect email', async () => {
    const invalidUsername = 'invaliduser@example.com';
    const invalidPassword = 'invalidpassword';
    const incorrectEmailError = 'Email doesn\'t exist';

    await login.fillLoginForm(invalidUsername, invalidPassword);
    await login.clickLoginButton();

    await expect(login.emailLabelLocator).toContainText(incorrectEmailError);
  });

  test('should display error message on invalid login attempt - incorrect password', async () => {
    const invalidPassword = 'invalidpassword';
    const incorrectPasswordError = 'Incorrect password';

    await login.fillLoginForm(users[0].email, invalidPassword);
    await login.clickLoginButton();

    await expect(login.passwordLabelLocator).toContainText(incorrectPasswordError);
  });

  test('should display an error message for invalid email during password reset', async () => {
    const errorMessage = 'Enter a valid email';

    await login.clickForgotPasswordLink();
    await login.fillEmailField('invalidEmal@...');

    await expect(login.emailLabelLocator).toContainText(errorMessage);
  });

  test('should redirect to home page after successful login', async ({ page }) => {
    const expectedUrl = 'https://dev-app.creativelysquared.com/login';

    await login.clickForgotPasswordLink();
    await login.fillEmailField(users[0].email);
    await login.clickResetPasswordButton();
    await login.clickLoginNowButton();

    await expect(page).toHaveURL(expectedUrl);
  });
});
