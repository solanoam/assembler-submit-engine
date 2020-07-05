import {IEventController} from "./event.controller.interface";
import { File } from "@google-cloud/storage";
import { ResultsStatus } from "./results.handler.interface";

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
    file: File,
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

