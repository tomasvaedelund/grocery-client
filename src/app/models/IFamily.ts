import { IUser } from './IUser';

export interface IFamily {
  name: string;
  createdBy: string;
  createdTime: number;
}

export interface IFamilyId extends IFamily {
  $key: string;
}

export interface IUserFamiliesResponse {
  families: IFamily[];
}
