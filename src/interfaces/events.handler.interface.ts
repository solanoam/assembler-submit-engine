import {IEvent} from "./event.interface";
import {IEventController} from "./event.controller.interface";

export interface IEventsHandler {
    lastEventTimestamp: number
    eventController: IEventController
    events: IEvent[];
    eventsScheduler();
    fetchEvents(): IEvent[];
}