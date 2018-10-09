import { IUser } from './IUser';

export interface IFamily {
  name: string;
  createdBy: IUser;
  createdTime: Date;
}
