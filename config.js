import 'dotenv/config';

// export const users = {
//   admin: {
//     email: process.env.ADMIN_EMAIL,
//     password: process.env.ADMIN_PASSWORD,
//     role: 'Admin',
//   },
//   customer: {
//     email: process.env.CUSTOMER_EMAIL,
//     password: process.env.CUSTOMER_PASSWORD,
//     role: 'Customer',
//   },
// };

export const users = [
  {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: 'Admin',
  },
  {
    email: process.env.CUSTOMER_EMAIL,
    password: process.env.CUSTOMER_PASSWORD,
    role: 'Customer',
  },
];

export const config = {
  baseURL: process.env.BASE_URL ?? 'https://dev-app.creativelysquared.com',
};
