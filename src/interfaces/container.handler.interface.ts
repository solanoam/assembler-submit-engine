import {IEvent} from "./event.interface";
import {IDockerPreRequisitesBuilder} from "./docker_pre_requisites.builder.interface";
import { IResults } from "./results.handler.interface";

export interface IContainerHandler {
    event: IEvent,
    dockerPreRequisitesBuilder: IDockerPreRequisitesBuilder,
    executionCommand: string
    results: IResults
}