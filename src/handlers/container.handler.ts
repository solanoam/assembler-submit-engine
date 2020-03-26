import {IEvent, IEventEnriched} from "../interfaces/event.interface";
import {IContainerHandler} from "../interfaces/container.handler.interface";
import {IDockerPreRequisitesBuilder} from "../interfaces/docker_pre_requisites.builder.interface";
import {DockerPreRequisitesBuilder} from "../builders/docker_pre_requisites.builder";
import { exec } from "child_process";

export class ContainerHandler implements IContainerHandler {
    event: IEvent;
    dockerPreRequisitesBuilder: IDockerPreRequisitesBuilder;
    executionCommand: string;
    containerHealthManager

    constructor(event: IEvent) {
        this.event = event;
        this.dockerPreRequisitesBuilder = new DockerPreRequisitesBuilder(this.event)
        this.executionCommand = this.dockerPreRequisitesBuilder.build()
        this.containerHealthManager = new ContainerHealthManager()
    }

    public getResults(): IEventEnriched{
        const results = this.runContainer()
        return {...this.event, textResults: results}
    }

    private runContainer = (): string => {
        exec(this.executionCommand, this.containerHealthManager.initDocker)
    }

    


}