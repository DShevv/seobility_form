export interface IformData {
  fullname: string;
  email: string;
  phone: string;
  date: string;
  message: string;
}

export interface IValidOut {
  result: boolean,
  message: string
}

export interface IDataError {
  fullname: IValidOut;
  email: IValidOut;
  phone: IValidOut;
  date: IValidOut;
  message: IValidOut;
}