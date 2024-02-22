// setup.js

import { instantiatePageObjects } from '../pageObject/pageObjects';
import { users } from '../testData/loginData';

export async function setupBeforeEachAdmin({ page }) {
  const { login } = instantiatePageObjects(page);
  await login.goto();
  await login.clickAcceptButton();
  await login.fillEmailField(users[0].email);
  await login.fillPasswordField(users[0].password);
  await login.clickLoginButton();
}

export async function setupBeforeEachCustomer({ page }) {
  const { login } = instantiatePageObjects(page);
  await login.goto();
  await login.clickAcceptButton();
  await login.fillEmailField(users[1].email);
  await login.fillPasswordField(users[1].password);
  await login.clickLoginButton();
}

// module.exports = {
//   setupBeforeEachCustomer, setupBeforeEachAdmin
// };
