import { config } from '../config';

export class Login {
  constructor(page) {
    this.page = page;
    this.url = `${config.baseURL}`;

    this.emailLocator = page.getByPlaceholder('Email');
    this.passwordLocator = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    this.acceptButton = page.getByRole('button', { name: 'Accept' });

    this.emailLabelLocator = page.locator('xpath=//input[@name=\'email\']/following-sibling::label');
    this.passwordLabelLocator = page.locator('xpath=//input[@name=\'password\']/following-sibling::label');
    this.forgotPasswordLinkLocator = page.getByRole('link', { name: 'Forgot password?' });
    this.emailConfirmationMessage = page.locator('xpath=//h2/following-sibling::p/span');
    this.resetPasswordButton = page.getByRole('button', { name: 'Reset password', exact: true });
    this.loginNowButton = page.getByRole('button', { name: 'Login now' });

    this.mainTitle = page.locator('h1');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async fillEmailField(email) {
    await this.emailLocator.fill(email);
  }

  async fillPasswordField(password) {
    await this.passwordLocator.fill(password);
  }

  async fillLoginForm(email, password) {
    await this.fillEmailField(email);
    await this.fillPasswordField(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async clickAcceptButton() {
    await this.acceptButton.click();
  }

  async clickForgotPasswordLink() {
    await this.forgotPasswordLinkLocator.click();
  }

  async clickResetPasswordButton() {
    await this.resetPasswordButton.click();
  }

  async clickLoginNowButton() {
    await this.loginNowButton.click();
  }
}
