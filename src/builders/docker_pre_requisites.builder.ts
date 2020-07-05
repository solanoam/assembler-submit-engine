import {IDockerPreRequisitesBuilder, IDockerPreRequisites} from "../interfaces/docker_pre_requisites.builder.interface";
import {IEvent} from "../interfaces/event.interface";
import {FolderBuilder} from "./folder.builder";
import {FileBuilder} from "./file.builder";
import {ScriptFilesBuilder} from "./script_files.builder";
import { IScriptFileBuilderParams } from "../interfaces/script_files.builder.interface";
import {scriptFilePaths} from "../../consts";
import ExecutionCommandBuilder from "./execution_command.builder";


export class DockerPreRequisitesBuilder implements IDockerPreRequisitesBuilder {
    event: IEvent;
    folderName: string;
    executionCommand: string

    
    /**
     * Initializing the builder. 
     */
    constructor(event: IEvent) {
        this.event = event;
        this.folderName = String(this.event.eventTimestamp);
    }

    
    /**
     * Main public function - builds the prerequisites and return the needed one to run the docker, 
     * the other ones are needed but they don't need to be referenced directly. 
     */
    public build = async (): Promise<IDockerPreRequisites> => {
        await this.handleFolderBuilder();
        await Promise.all([this.handleScriptFilesBuilder(), this.handleFileBuilder()])
        this.handleExecutionCommandBuilder();
        console.log(`prerequesits builder is done`, `folder name - ${this.folderName}`, `execution command - ${this.executionCommand}`)
        return { 
            folderName: this.folderName, 
            executionCommand: this.executionCommand
        }
    }

    /**
     * private for handling the folder builder. 
     */
    private async handleFolderBuilder() {
        await new FolderBuilder(this.folderName).build();
    }

    /**
     * private for handling the file builder. 
     */
    private async handleFileBuilder() {
        await new FileBuilder(this.event, this.folderName).build();
    }

    /**
     * private for handling the script file builder. 
     */
    private async handleScriptFilesBuilder(){
        const ScriptFilesBuilderParams: IScriptFileBuilderParams = { folderName: this.folderName, filePaths: scriptFilePaths};
        await new ScriptFilesBuilder(ScriptFilesBuilderParams).build()
    }

    /**
     * private for handling the execution command builder
     */
    private handleExecutionCommandBuilder(){
        this.executionCommand = new ExecutionCommandBuilder(this.folderName).build()
    }
}