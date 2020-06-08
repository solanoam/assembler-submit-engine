import {IEvent} from "./event.interface";
import { IDockerPreRequisites } from '../builders/docker_pre_requisites.builder';

export interface IDockerPreRequisitesBuilder {
    event: IEvent
    folderName: string
    executionCommand: string
    build(): Promise<IDockerPreRequisites>
}