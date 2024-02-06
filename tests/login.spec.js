// @ts-check
const { test, expect } = require('@playwright/test');
const { Login } = require('../pageObject/login.page');
const { users } = require('../testData/loginData');

test.describe('verify login functionality', () => {
  let login;

  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    await login.goto();
    await login.clickAcceptButton();
  });

  test('should display on login page', async () => {
    await expect(login.emailLocator).toBeVisible();
    await expect(login.passwordLocator).toBeVisible();
    await expect(login.loginBtn).toBeVisible();
    await expect(login.forgotPasswordLinkLocator).toBeVisible();
  });

  for (let user of users) {
    test(`verify login as ${user.role}`, async ({ page }) => {
      await login.fillEmailField(user.email);
      await login.fillPasswordField(user.password);
      await login.clickLoginBtn();

      if (user.role === 'Admin') {
        await expect(page).toHaveURL(/.*dashboard/);
        await expect(login.mainTitle).toHaveText('Let’s sort your day out')
      }
      else {
        await expect(page).toHaveURL(/.*projects/);
        await expect(login.mainTitle).toBeVisible();
        await expect(login.mainTitle).toHaveText('Your projects');
      }
    })
  }

  test('click on Login button with empty fields', async () => {
    await login.clickLoginBtn();

    await expect(login.emailLabelLocator).toHaveText('This is required field');
    await expect(login.passwordLabelLocator).toHaveText('This is required field')
  });

  for (let user of users) {
    test(`click Forgot password and verify success message for ${user.role}`, async ({ }) => {
      await login.clickForgotPasswordLing();
      await login.fillEmailField(user.email);
      await login.clickResetPasswordBtn();

      await expect(login.emailConfirmationMessage).toHaveText(user.email);
    })
  }

  test('should display error message on invalid login attempt - incorrect email', async () => {
    const invalidUsername = 'invaliduser@example.com';
    const invalidPassword = 'invalidpassword';
    const incorrectEmailError = "Email doesn't exist";

    await login.fillLoginForm(invalidUsername, invalidPassword);
    await login.clickLoginBtn();

    await expect(login.emailLabelLocator).toContainText(incorrectEmailError)
  });

  test('should display error message on invalid login attempt - incorrect password', async () => {
    const invalidPassword = 'invalidpassword';
    const incorrectPasswordError = "Incorrect password";

    await login.fillLoginForm(users[0].email, invalidPassword);
    await login.clickLoginBtn();

    await expect(login.passwordLabelLocator).toContainText(incorrectPasswordError)
  });

  test('should navigate to password reset page when "Forgot Password" link is clicked', async ({ page }) => {
    const expectedUrl = 'https://dev-app.creativelysquared.com/forgot-password';

    await login.clickForgotPasswordLink();

    await expect(page).toHaveURL(expectedUrl);
  });

  test('should allow password reset with valid email', async () => {

  });

  test('should display an error message for invalid email during password reset', async () => {
    // Add actions to fill an invalid email for password reset
    // Add assertions to check if an error message is displayed
  });

  test('should redirect to home page after successful login', async ({ page }) => {
    const expectedUrl = 'https://dev-app.creativelysquared.com/login';

    await login.clickForgotPasswordLing();
    await login.fillEmailField(users[0].email);
    await login.clickResetPasswordBtn();
    await login.clickLoginButton();

    await expect(page).toHaveURL(expectedUrl);
  });

  test('should not display error message after successful login', async () => {
    // Add actions to fill valid credentials and click login button
    // Add assertions to check if no error message is displayed
  });

  test('should not allow login with an empty password', async () => {
    // Add actions to fill valid username and empty password, click login button
    // Add assertions to check if an error message is displayed
  });

  test('should not allow login with an empty username', async () => {
    // Add actions to fill empty username and valid password, click login button
    // Add assertions to check if an error message is displayed
  });

})


