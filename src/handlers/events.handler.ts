import {IEventsHandler as IEventHandler} from "../interfaces/events.handler.interface";
import {IEvent, IEventMeta, IEventEnriched} from "../interfaces/event.interface";
import {IEventController} from "../interfaces/event.controller.interface";
import {EventController} from "../controller/event.controller";
import {ContainerHandler} from "./container.handler";
import { IPostEventHandlerTrigger } from "../interfaces/post_event_handler_trigger.service.interface";

/**
 * Handler for the whole submissions event, will handle all the necessary actions to get submission
 * results and send them out.
 * Does not contain logic, only handles calls to other components
 */
export class EventHandler implements IEventHandler {
    eventController: IEventController
    postEventHandlerTrigger: IPostEventHandlerTrigger
    
    
    /**
     * Initializing the event handler.
     */
    constructor(eventController: IEventController, postEventHandlerTrigger: IPostEventHandlerTrigger){
        this.eventController = eventController;
        this.postEventHandlerTrigger = postEventHandlerTrigger
    }
    
    /**
     * Handle the entire event flow thorough the engine. first handles aquiring the event via the controller and them
     * await its runtime through the engine
     */
    public handle = async (eventMeta: IEventMeta) => {
        const event: IEvent = await this.eventController.getEvent(eventMeta)
        const eventAfterContainerRun: IEventEnriched = await new ContainerHandler(event).handle();
        this.postEventHandlerTrigger.trigger(eventAfterContainerRun)
    }

}