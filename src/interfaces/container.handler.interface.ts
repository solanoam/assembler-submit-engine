import {IEvent} from "./event.interface";
import {IDockerPreRequisitesBuilder} from "./docker_pre_requisites.builder.interface";
import { IResults } from '../handlers/results.handler';

export interface IContainerHandler {
    event: IEvent,
    dockerPreRequisitesBuilder: IDockerPreRequisitesBuilder,
    executionCommand: string
    results: IResults
}