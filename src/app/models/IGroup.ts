export interface IGroup {
  name: string;
  createdBy: string;
  createdAt: firebase.firestore.FieldValue;
}

export interface IGroupId extends IGroup {
  id: string;
}
