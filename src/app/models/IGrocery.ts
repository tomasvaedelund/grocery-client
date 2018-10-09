import { IUser } from './IUser';

export interface IGrocery {
  name: string;
  createdBy: IUser;
  createdTime: Date;
}
