import {IEvent} from "../interfaces/event.interface";
import {IContainerHandler} from "../interfaces/container.handler.interface";
import {IDockerPreRequisitesBuilder} from "../interfaces/docker_pre_requisites.handler.interface";
import {DockerPreRequisitesBuilder} from "./docker_pre_requisites.handler";

export class ContainerHandler implements IContainerHandler {
    event: IEvent;
    dockerPreRequisitesBuilder: IDockerPreRequisitesBuilder;

    constructor(event: IEvent) {
        this.event = event;
        this.dockerPreRequisitesBuilder = new DockerPreRequisitesBuilder(this.event)
    }

    public getResults(){

    }
}