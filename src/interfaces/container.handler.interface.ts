import {IEvent} from "./event.interface";
import {IDockerPreRequisitesBuilder} from "./docker_pre_requisites.handler.interface";

export interface IContainerHandler {
    event: IEvent
    dockerPreRequisitesBuilder: IDockerPreRequisitesBuilder
}