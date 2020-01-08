import {IEvent} from "./event.interface";

export interface IDockerPreRequisitesBuilder {
    event: IEvent
    folderName: string
    build(): void
}