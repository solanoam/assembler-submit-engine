import {IEvent, IEventEnriched} from "../interfaces/event.interface";
import {IContainerHandler} from "../interfaces/container.handler.interface";
import {IDockerPreRequisitesBuilder} from "../interfaces/docker_pre_requisites.builder.interface";
import {DockerPreRequisitesBuilder} from "../builders/docker_pre_requisites.builder";
import { exec } from "child_process";
import ContainerHealthManager, { IContainerHealthManager } from '../managers/container_health.manager';
import { IResults } from './results.handler';

export class ContainerHandler implements IContainerHandler {
    event: IEvent;
    dockerPreRequisitesBuilder: IDockerPreRequisitesBuilder;
    executionCommand: string;
    folderPath: string;
    containerHealthManager: IContainerHealthManager;
    results: IResults;

    constructor (event: IEvent) {
        this.event = event;
        this.dockerPreRequisitesBuilder = new DockerPreRequisitesBuilder(this.event);
        const dockerPreRequisites = this.dockerPreRequisitesBuilder.build();
        this.folderPath = dockerPreRequisites.folderName;
        this.executionCommand = dockerPreRequisites.executionCommand;
        this.containerHealthManager = new ContainerHealthManager(this.folderPath);
    }

    public getResults = (): IEventEnriched => {
        this.runContainer();
        return {...this.event, output: this.results}
    };

    private runContainer = (): void => {
        exec(this.executionCommand, this.containerHealthManager.initDocker);
        this.results = this.containerHealthManager.getResults()
    };
}