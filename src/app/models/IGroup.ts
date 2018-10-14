export interface IGroup {
  name: string;
  createdBy: string;
  createdAt: firebase.firestore.FieldValue;
  id?: string;
}
