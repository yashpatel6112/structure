export interface User {
  name: string;
  roleId: string;
}

export interface OtpVerifyResponse {
  data: {
    accessToken: string;
    user: User;
  };
}
