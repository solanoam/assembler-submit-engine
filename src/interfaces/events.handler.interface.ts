import {IEvent, IEventMeta} from "./event.interface";
import {IEventController} from "./event.controller.interface";
import { EventController } from '../controller/event.controller';

export interface IEventsHandler {
    handleEvent(event: IEventMeta): any
}