import {IDockerPreRequisitesBuilder} from "../interfaces/docker_pre_requisites.builder.interface";
import {IEvent} from "../interfaces/event.interface";
import {FolderBuilder} from "./folder.builder";
import {FileBuilder} from "./file.builder";
import {IScriptFileBuilderParams, ScriptFilesBuilder} from "./script_files.builder";
import {scriptFilePaths} from "../../consts";
import ExecutionCommandBuilder from "./execution_command.builder";

export class DockerPreRequisitesBuilder implements IDockerPreRequisitesBuilder {
    event: IEvent;
    folderName: string;
    executionCommand: string

    constructor(event: IEvent) {
        this.event = event;
        this.folderName = this.event.id.toString();
    }

    public build = (): string => {
        this.handleFolderBuilder();
        this.handleFileBuilder();
        this.handleScriptFilesBuilder();
        this.handleExecutionCommandBuilder();
        return this.executionCommand
    }

    private handleFolderBuilder() {
        new FolderBuilder(this.folderName).build();
    }

    private handleFileBuilder() {
        const { code } = this.event;
        new FileBuilder(code, this.folderName).build();
    }

    private handleScriptFilesBuilder(){
        const ScriptFilesBuilderParams: IScriptFileBuilderParams = { folderName: this.folderName, filePaths: scriptFilePaths};
        new ScriptFilesBuilder(ScriptFilesBuilderParams).build()
    }

    //TODO folder path may not be equle to folderName 
    private handleExecutionCommandBuilder(){
        this.executionCommand = new ExecutionCommandBuilder(this.folderName).build()
    }
}