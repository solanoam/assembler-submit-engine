import {IEvent} from "./event.interface";

export interface IEventController {
    firebase: object
    getEvent(eventId: number): IEvent
    fetchNewerEvents(): IEvent[]
}