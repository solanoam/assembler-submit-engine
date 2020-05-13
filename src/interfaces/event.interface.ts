import {IEventConfigStep} from "./event_config.interface";
import {IEventController} from "./event.controller.interface";
import { IResults } from '../handlers/results.handler';
import { FileBuilder } from '../builders/file.builder';

export interface IEventMeta {
    id: string
    path: string,
    userID: string,
    taskID: string
    testcaseID: string
}

export enum EventStatuses {
    NotTested = 0,
    Passed = 1,
    CompilationFailed = 2,
    ExecutionFailed = 3,
}

export interface IEvent {
    id: string
    eventTimestamp: number
    status?: EventStatuses
    statusTimestamp?: number
    file: any,
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

