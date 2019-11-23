import {IEvent} from "./event.interface";

export interface IDockerPreRequisitesBuilder {
    event: IEvent
    build(): void
}