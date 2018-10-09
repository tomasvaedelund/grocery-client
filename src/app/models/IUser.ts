import { IFamily } from './IFamily';

export interface IUser {
  email: string;
  displayName: string;
  families: IFamily[];
}
