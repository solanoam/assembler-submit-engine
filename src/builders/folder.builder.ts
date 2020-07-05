import * as fs from "fs";
import { IFolderBuilder } from "../interfaces/folder.builder.interface";


/**
 * Builder for the docker volume that will contain the event .asm code and script files 
 */
export class FolderBuilder implements IFolderBuilder{
    folderName: string;

    /**
     * Initializing the folder builder. 
     */
    constructor(folderName: string) {
        this.folderName = folderName;
    }


    /**
     * Main public method - builds the folder. 
     */
    public async build(){
        fs.mkdirSync(this.folderName)
        
    }

}