import AuthAPI from './AuthAPI';

describe('AuthAPI', () => {
  it('handles login', async () => {
    const auth = new AuthAPI();
    const response = await auth.login();
    expect(response.token).toEqual('1234');
  });
});
