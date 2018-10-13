export interface IShoppingList {
  name: string;
  createdByUserId: string;
  created: Date;
  groceryIds: string[];
  groupId: string;
}
