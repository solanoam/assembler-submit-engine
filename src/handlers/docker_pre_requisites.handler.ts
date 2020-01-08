import {IDockerPreRequisitesBuilder} from "../interfaces/docker_pre_requisites.handler.interface";
import {IEvent} from "../interfaces/event.interface";
import {FolderBuilder} from "./folder.builder";
import {FileBuilder} from "./file.builder";
import {IScriptFileBuilderParams, ScriptFilesBuilder} from "./script_files.builder";
import {scriptFilePaths} from "../../consts";

export class DockerPreRequisitesBuilder implements IDockerPreRequisitesBuilder {
    event: IEvent;
    folderName: string;


    constructor(event: IEvent) {
        this.event = event;
        this.folderName = this.event.id.toString();
    }

    public build(){
        this.handleFolderBuilder();
        this.handleFileBuilder();
        this.handleScriptFilesBuilder();

    }

    private handleFolderBuilder() {
        new FolderBuilder(this.folderName).build();
    }

    private handleFileBuilder(){
        const { code } = this.event;
        new FileBuilder(code).build();
    }

    private handleScriptFilesBuilder(){
        const ScriptFilesBuilderParams: IScriptFileBuilderParams = { folderName: this.folderName, filePaths: scriptFilePaths};
        new ScriptFilesBuilder(ScriptFilesBuilderParams).build()
    }
}