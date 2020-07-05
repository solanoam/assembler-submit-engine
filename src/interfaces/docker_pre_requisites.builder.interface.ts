import {IEvent} from "./event.interface";

export interface IDockerPreRequisitesBuilder {
    event: IEvent
    folderName: string
    executionCommand: string
    build(): Promise<IDockerPreRequisites>
}

export interface IDockerPreRequisites {
    executionCommand: string
    folderName: string
}