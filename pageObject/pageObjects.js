import { Login } from './login.page';
import { Navigation } from './Navigation';
import { Projects } from './Projects';
import { Customer } from './customer.page';

export function instantiatePageObjects(page) {
  return {
    login: new Login(page),
    navigation: new Navigation(page),
    projects: new Projects(page),
    customer: new Customer(page),
  };
}

// module.exports = {
//   instantiatePageObjects
// };
