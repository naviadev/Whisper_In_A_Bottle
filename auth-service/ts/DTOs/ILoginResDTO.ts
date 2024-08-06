import { Tid, TMessage } from 'ts/types/types';

export default interface ILoginResDTO {
  success: boolean;
  id?: Tid;
  message?: TMessage;
}
