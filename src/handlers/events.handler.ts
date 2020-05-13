import {IEventsHandler} from "../interfaces/events.handler.interface";
import * as moment from "moment";
import {IEvent} from "../interfaces/event.interface";
import {IEventController} from "../interfaces/event.controller.interface";
import {EventController} from "../controller/event.controller";
import {ContainerHandler} from "./container.handler";

export class EventsHandler implements IEventsHandler {

    async handleEvent(event: IEvent) {
        const eventContainer = new ContainerHandler(event).getResults();
    }

}