import { IEventEnriched } from "./event.interface";

export interface IPostEventHandlerTrigger {
  url: string;
  token: string;
  trigger(event: IEventEnriched): void;
}
