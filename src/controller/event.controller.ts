import {IEventController} from "../interfaces/event.controller.interface";
import {IEvent} from "../interfaces/event.interface";
import {firebaseClient} from "../index";

// TODO - this is just a guess
export class EventController implements IEventController {
    firebase: object;

    constructor() {
        this.firebase = firebaseClient;
    }

    public getEvent(eventId: number): IEvent {
        return this.firebase.get(eventId)
    }

    public saveEvent(event: IEvent) {
        this.firebase.save(...event)
    }

    public fetchNewerEvents(): IEvent[] {
        const where = {statusTimestamp: {
            key:"statusTimestamp", value: null
        }};
        return this.firebase.getAll(where);
    }

}
