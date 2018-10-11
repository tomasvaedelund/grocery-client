import { IGrocery } from './IGrocery';
import { IUser } from './IUser';
import { IFamily } from './IFamily';

export interface IShoppingList {
  name: string;
  createdBy: IUser;
  createdTime: Date;
  groceries: IGrocery[];
  family: IFamily;
}
