import {IEvent, IEventMeta} from "./event.interface";
import * as admin from "firebase-admin" 

export interface IEventController {
    eventsStorage
    eventsBucket: string
    getEvent(event: IEventMeta): Promise<IEvent>
}