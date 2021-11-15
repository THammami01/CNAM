import IRefReqData from "./IRefReqData";

export default interface IRefResData extends IRefReqData {
  ref: string;
  refDate: Date;
}
