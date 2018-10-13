export interface IMembership {
  userId: string;
  groupId: string;
  joinedAt: firebase.firestore.FieldValue;
}
