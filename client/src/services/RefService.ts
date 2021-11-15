import axios from "axios";
import IRefReqData from "../interfaces/IRefReqData";

export default class RefService {
  static baseRoute = "/api/ref";

  static addRef(refFormData: IRefReqData) {
    const accessToken = localStorage.getItem("accessToken");

    return axios.post(`${this.baseRoute}/`, refFormData, {
      headers: { Authorization: accessToken },
    });
  }
}
