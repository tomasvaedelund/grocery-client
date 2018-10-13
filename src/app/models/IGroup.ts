import { IUser } from './IUser';

export interface IGroup {
  name: string;
  createdBy: string;
  createdAt: firebase.firestore.FieldValue;
}

export interface IGroupUsersResponse {
  users: IUser[];
}
