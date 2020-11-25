import Auth from './Auth';

describe('Auth', () => {
  it('handles login', async () => {
    const auth = new Auth();
    const response = await auth.login();
    expect(response.token).toEqual('1234');
  });
});
