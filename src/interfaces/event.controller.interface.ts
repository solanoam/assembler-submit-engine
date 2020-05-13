import {IEvent} from "./event.interface";
import * as admin from "firebase-admin" 

export interface IEventController {
    eventsStorage: admin.storage.Storage
    eventsBucket: string
    getEvent(path: string): Promise<IEvent>
}