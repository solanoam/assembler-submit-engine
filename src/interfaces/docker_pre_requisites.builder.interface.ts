import {IEvent} from "./event.interface";

export interface IDockerPreRequisitesBuilder {
    event: IEvent
    folderName: string
    executionCommand: string
    build(): string
}