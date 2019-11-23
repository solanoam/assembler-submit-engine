import {IEventsHandler} from "../interfaces/events.handler.interface";
import * as moment from "moment";
import {IEvent} from "../interfaces/event.interface";
import {IEventController} from "../interfaces/event.controller.interface";
import {EventController} from "../controller/event.controller";
import {ContainerHandler} from "./container.handler";

export class EventsHandler implements IEventsHandler {
    lastEventTimestamp: number;
    eventController: IEventController;
    events: IEvent[];

    constructor() {
        this.lastEventTimestamp = moment().unix();
        this.eventController = new EventController();
    }

    fetchEvents(): IEvent[] {
        this.lastEventTimestamp = moment().unix();
        return this.eventController.fetchNewerEvents();
    }

    eventsScheduler() {
        while (true) {
            this.fetchEvents();
            this.events.forEach((e: IEvent) => {
                this.handleEvent(e)
            })
        }
    }

    async handleEvent(event: IEvent) {
        const eventContainer = new ContainerHandler(event);
    }


}