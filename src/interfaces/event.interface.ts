import {IEventConfigStep} from "./event_config.interface";
import {IEventController} from "./event.controller.interface";

export enum EventStatuses {
    NotTested = 0,
    Passed = 1,
    CompilationFailed = 2,
    ExecutionFailed = 3,
}

export interface IEvent {
    id: number
    eventTimestamp: number
    config: IEventConfigStep[]
    code: string
    status?: EventStatuses
    statusTimestamp?: number
}

export interface IEventServices {
    eventController: IEventController
}

