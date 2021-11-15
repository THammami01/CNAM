import axios from "axios";
import IConsultationData from "../interfaces/IConsultationData";
import IEntryData from "../interfaces/IEntryData";

export default class EntryService {
  static baseRoute = "/api/entry";

  static checkConsultationData(consultationData: IConsultationData) {
    const accessToken = localStorage.getItem("accessToken");

    return axios.post(`${this.baseRoute}/check-consultation-data`, consultationData, {
      headers: { Authorization: accessToken },
    });
  }

  static saveEntryData(entryData: IEntryData) {
    const accessToken = localStorage.getItem("accessToken");

    return axios.post(`${this.baseRoute}/save-entry-data`, entryData, {
      headers: { Authorization: accessToken },
    });
  }
}
