import {IEvent, IEventEnriched} from "../interfaces/event.interface";
import {IContainerHandler} from "../interfaces/container.handler.interface";
import {IDockerPreRequisitesBuilder} from "../interfaces/docker_pre_requisites.builder.interface";
import {DockerPreRequisitesBuilder} from "../builders/docker_pre_requisites.builder";
import { exec } from "child_process";
import ContainerHealthManager from '../managers/container_health.manager';
import { IContainerHealthManager } from "../interfaces/container_health.manager.interface";
import { IResults } from "../interfaces/results.handler.interface";

/**
 * Handler for the docker container that will compile and run the user code in the event.
 * The handler will handle calls to the different components needed to run the container:
 * - Prerequisites
 * - Container Health Manager
 * - Executing Docker Run Command
 * The handler will return an enriched event to the caller
 */
export class ContainerHandler implements IContainerHandler {
    event: IEvent;
    dockerPreRequisitesBuilder: IDockerPreRequisitesBuilder;
    executionCommand: string;
    folderPath: string;
    containerHealthManager: IContainerHealthManager;
    results: IResults;

    /**
     * Initializing the Container Handler. 
     */
    constructor (event: IEvent) {
        this.event = event;
        this.dockerPreRequisitesBuilder = new DockerPreRequisitesBuilder(this.event);
    }
    
    /**
     * Main handler function, calls the different components to ensure docker container execution. 
     */
    public handle = async (): Promise<IEventEnriched> => {
        await this.handleDockerPreRequisitesBuilder();
        await this.runContainer();
        return {...this.event, ...this.results}
    };

    
    /**
     * Private for handling calls to prerequisites building.
     * will ensure creation for:
     * - Docker Prerequisites
     * - Folder Volume
     * - Docker Execution Command
     * -  Container Health Manager
     */
    private handleDockerPreRequisitesBuilder = async (): Promise<void> => {
        const dockerPreRequisites = await this.dockerPreRequisitesBuilder.build();
        this.folderPath = dockerPreRequisites.folderName;
        this.executionCommand = dockerPreRequisites.executionCommand;
        this.containerHealthManager = new ContainerHealthManager(this.folderPath);
    }

    /**
     * Private for running the docker container in bash environment. 
     * Wrapped in Promise for better usage.
     */
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
    

    /**
     * Private for executing the docker run command and log some logs. 
     */
    private runContainer = async (): Promise<void> => {
        let time = Date.now()
        await this.execContainerRunCommand()
        this.results = await this.containerHealthManager.getResults()
        console.log(`container run elapsed time - ${Date.now() - time}`)
    };
}