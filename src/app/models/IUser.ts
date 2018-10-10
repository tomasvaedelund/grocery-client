import { IFamily } from './IFamily';

export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  families?: IFamily[];
}
