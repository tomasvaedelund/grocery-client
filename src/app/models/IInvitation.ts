import { IFamily } from './IFamily';

export interface IInvitation {
  inviterEmail: string;
  inviteeEmail: string;
  family: IFamily;
}
