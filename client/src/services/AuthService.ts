import axios from "axios";
import ILoginReqData from "../interfaces/ILoginReqData";

export default class AuthService {
  static baseRoute = "/api/auth";

  static login(loginFormData: ILoginReqData) {
    return axios.post(`${this.baseRoute}/login`, loginFormData);
  }

  static verifyAccessToken(accessToken: string) {
    return axios.get(`${this.baseRoute}/verify-token`, {
      headers: { Authorization: accessToken },
    });
  }
}
