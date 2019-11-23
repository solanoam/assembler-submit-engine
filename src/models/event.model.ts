import {EventStatuses, IEvent, IEventServices} from "../interfaces/event.interface";
import {IEventConfigStep} from "../interfaces/event_config.interface";
import moment = require("moment");
import {IEventController} from "../interfaces/event.controller.interface";
import {EventController} from "../controller/event.controller";

export default class Event implements IEvent, IEventServices {
    id: number;
    eventTimestamp: number;
    code: string;
    config: IEventConfigStep[];
    status: EventStatuses;
    statusTimestamp: number;
    eventController: IEventController;

    constructor(eventId: number) {
        this.eventController = new EventController();
        const { id, eventTimestamp, code, config} = this.eventController.getEvent(eventId);
        this.id = id;
        this.eventTimestamp = eventTimestamp;
        this.code = code;
        this.config = config;
        this.status = EventStatuses.NotTested;
        this.statusTimestamp = moment().unix();

    }

    public toJSON(){
        const { id, eventTimestamp, code, config, status, statusTimestamp} = this;
        return {
            id,
            eventTimestamp,
            code,
            config,
            status,
            statusTimestamp
        }
    }

}