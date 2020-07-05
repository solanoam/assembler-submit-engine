import {IEvent, IEventMeta} from "./event.interface";
import { Bucket } from "@google-cloud/storage";

export interface IEventController {
    eventsStorage: Bucket
    eventsBucket: string
    getEvent(event: IEventMeta): Promise<IEvent>
}