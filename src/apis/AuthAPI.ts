interface LoginResponse {
  token: string;
}

class AuthAPI {
  async login(): Promise<LoginResponse> {
    return { token: '1234' };
  }
}

export default AuthAPI;
