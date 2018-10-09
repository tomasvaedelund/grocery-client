import { IGrocery } from './IGrocery';
import { IUser } from './IUser';

export interface IShoppingList {
  name: string;
  createdBy: IUser;
  createdTime: Date;
  groceries: IGrocery[];
}
