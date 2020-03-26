import {IEvent} from "./event.interface";
import {IDockerPreRequisitesBuilder} from "./docker_pre_requisites.builder.interface";

export interface IContainerHandler {
    event: IEvent,
    dockerPreRequisitesBuilder: IDockerPreRequisitesBuilder,
    executionCommand: string
}