import {IEvent, IEventMeta} from "./event.interface";
import {IEventController} from "./event.controller.interface";
import { IPostEventHandlerTrigger } from "./post_event_handler_trigger.service.interface";

export interface IEventsHandler {
    eventController: IEventController
    postEventHandlerTrigger: IPostEventHandlerTrigger
    handle(event: IEventMeta): any
}