import {IEvent} from "./event.interface";
import * as firebase from "firebase";

export interface IEventController {
    eventsCollection: firebase.firestore.CollectionReference
    getEvent(eventId: number): IEvent
    fetchNewerEvents(): IEvent[]
}