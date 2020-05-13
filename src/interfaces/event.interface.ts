import {IEventConfigStep} from "./event_config.interface";
import {IEventController} from "./event.controller.interface";
import { IResults } from '../handlers/results.handler';

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
    path: string
    userID: string
    taskID: string
    testcaseID: string
}

export interface IEventEnriched extends IEvent {
    output: IResults
}

export interface IEventServices {
    eventController: IEventController
}

