import {IEvent, IEventEnriched} from "../interfaces/event.interface";
import {IContainerHandler} from "../interfaces/container.handler.interface";
import {IDockerPreRequisitesBuilder} from "../interfaces/docker_pre_requisites.builder.interface";
import {DockerPreRequisitesBuilder} from "../builders/docker_pre_requisites.builder";
import { exec } from "child_process";
import ContainerHealthManager, { IContainerHealthManager } from '../managers/container_health.manager';
import { IResults } from './results.handler';
import { stdout } from "process";

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
    }
    
    public getEnrichedEvent = async (): Promise<IEventEnriched> => {
        await this.handleDockerPreRequisitesBuilder();
        await this.runContainer();
        return {...this.event, ...this.results}
    };

    private handleDockerPreRequisitesBuilder = async (): Promise<void> => {
        const dockerPreRequisites = await this.dockerPreRequisitesBuilder.build();
        this.folderPath = dockerPreRequisites.folderName;
        this.executionCommand = dockerPreRequisites.executionCommand;
        this.containerHealthManager = new ContainerHealthManager(this.folderPath);
    }

    private execContainerRunCommand = (...args): Promise<string> => {
        return new Promise((resolve, reject) => {
             exec(this.executionCommand, (error, stdout, stderr) =>{
                if (error) {
                    console.log(`error: ${error.message}`);
                    reject(error)
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    reject(error)
                }
                console.log(`running docker container - ${stdout}`)
                resolve(stdout)
            })
        })
    }
    
    private runContainer = async (): Promise<void> => {
        let time = Date.now()
        await this.execContainerRunCommand()
        this.results = await this.containerHealthManager.getResults()
        console.log(`container run elapsed time - ${Date.now() - time}`)
    };
}