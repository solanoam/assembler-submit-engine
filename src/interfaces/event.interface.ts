import {IEventConfigStep} from "./event_config.interface";
import {IEventController} from "./event.controller.interface";
import { IResults, ResultsStatus } from '../handlers/results.handler';
import { FileBuilder } from '../builders/file.builder';

export interface IEventMeta {
    id: string
    path: string,
    userID: string,
    taskID: string
    testcaseID: string
}

export interface IEvent {
    id: string
    eventTimestamp: number
    statusTimestamp?: number
    file: any,
    path: string
    userID: string
    taskID: string
    testcaseID: string
}

export interface IEventEnriched extends IEvent {
    output: string
    status: ResultsStatus
}

export interface IEventServices {
    eventController: IEventController
}

