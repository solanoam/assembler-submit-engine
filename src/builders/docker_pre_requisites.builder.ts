import {IDockerPreRequisitesBuilder} from "../interfaces/docker_pre_requisites.builder.interface";
import {IEvent} from "../interfaces/event.interface";
import {FolderBuilder} from "./folder.builder";
import {FileBuilder} from "./file.builder";
import {IScriptFileBuilderParams, ScriptFilesBuilder} from "./script_files.builder";
import {scriptFilePaths} from "../../consts";
import ExecutionCommandBuilder from "./execution_command.builder";

export interface IDockerPreRequisites {
    executionCommand: string
    folderName: string
}

export class DockerPreRequisitesBuilder implements IDockerPreRequisitesBuilder {
    event: IEvent;
    folderName: string;
    executionCommand: string

    constructor(event: IEvent) {
        this.event = event;
        this.folderName = String(this.event.eventTimestamp);
    }

    public build = async (): Promise<IDockerPreRequisites> => {
        await this.handleFolderBuilder();
        await Promise.all([this.handleScriptFilesBuilder(), this.handleFileBuilder()])
        this.handleExecutionCommandBuilder();
        console.log(`
prerequesits builder is done:
folder name - ${this.folderName}
execution command - ${this.executionCommand}
        `)
        return { 
            folderName: this.folderName, 
            executionCommand: this.executionCommand
        }
    }

    private async handleFolderBuilder() {
        await new FolderBuilder(this.folderName).build();
    }

    private async handleFileBuilder() {
        await new FileBuilder(this.event, this.folderName).build();
    }

    private async handleScriptFilesBuilder(){
        const ScriptFilesBuilderParams: IScriptFileBuilderParams = { folderName: this.folderName, filePaths: scriptFilePaths};
        await new ScriptFilesBuilder(ScriptFilesBuilderParams).build()
    }

    //TODO folder path may not be equle to folderName 
    private handleExecutionCommandBuilder(){
        this.executionCommand = new ExecutionCommandBuilder(this.folderName).build()
    }
}