import {IDockerPreRequisitesBuilder} from "../interfaces/docker_pre_requisites.handler.interface";
import {IEvent} from "../interfaces/event.interface";

export class DockerPreRequisitesBuilder implements IDockerPreRequisitesBuilder {
    event: IEvent;

    constructor(event: IEvent) {
        this.event = event
    }

    public build(){

    }
}