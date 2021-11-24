export const LOGIN = 'LOGIN';

export const actionLogin = (name, email) => ({
  type: LOGIN,
  name,
  email,
});
