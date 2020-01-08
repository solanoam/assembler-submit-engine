import {IEventController} from "../interfaces/event.controller.interface";
import {IEvent} from "../interfaces/event.interface";
import {firebaseClient} from "../index";
import * as firebase from "firebase";
import {collectionNames} from "../../consts";

export class EventController implements IEventController {
    eventsCollection: firebase.firestore.CollectionReference;

    constructor() {
        this.eventsCollection = firebaseClient.collection(collectionNames.events);
    }

    public getEvent(eventId: number): IEvent {
        return this.eventsCollection.get(eventId)
    }

    public saveEvent(event: IEvent) {
        this.eventsCollection.set(...event)
    }

    public fetchNewerEvents(): IEvent[] {
        const where = {statusTimestamp: {
            key:"statusTimestamp", value: null
        }};
        return this.eventsCollection.getAll(where);
    }

}
