import {IEventsHandler} from "../interfaces/events.handler.interface";
import {IEvent, IEventMeta, IEventEnriched} from "../interfaces/event.interface";
import {IEventController} from "../interfaces/event.controller.interface";
import {EventController} from "../controller/event.controller";
import {ContainerHandler} from "./container.handler";
import { postEventHandlerTrigger, IPostEventHandlerTrigger } from '../services/post.event.handler.trigger';

export class EventsHandler implements IEventsHandler {
    eventController: IEventController
    postEventHandlerTrigger: IPostEventHandlerTrigger
    
    constructor(eventController: EventController, postEventHandlerTrigger: IPostEventHandlerTrigger){
        this.eventController = eventController;
        this.postEventHandlerTrigger = postEventHandlerTrigger
    }
    
    async handleEvent(eventMeta: IEventMeta) {
        const event: IEvent = await this.eventController.getEvent(eventMeta)
        const eventAfterContainerRun: IEventEnriched = await new ContainerHandler(event).getEnrichedEvent();
        this.postEventHandlerTrigger.trigger(eventAfterContainerRun)
    }

}