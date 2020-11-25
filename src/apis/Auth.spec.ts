import Auth from './Auth';

describe('Auth', () => {
  it('authenticates users', async () => {
    const auth = new Auth();
    const response = await auth.authenticate();
    expect(response.token).toEqual('1234');
  });
});
