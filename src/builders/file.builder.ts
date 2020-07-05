import * as fs from "fs";
import {asmFileName} from "../../consts";
import { IEvent } from '../interfaces/event.interface';
import { IFileBuilder } from "../interfaces/file.builder.interface";

/**
 * Builds the user .asm file from the event, using the given API from the event controller. 
 */
export class FileBuilder implements IFileBuilder {
    event: IEvent;
    folderPath: string;

    /**
     * Initializing the File Builder. 
     */
    constructor(event: IEvent, folderpath: string) {
        this.event = event
        this.folderPath = `${process.cwd()}/${folderpath}/${asmFileName}`;
    }

    /**
     * Main public method - builds the file from the event to the given folder. 
     */
    public async build(){
        const { file } = this.event
        await file.download({
            destination: this.folderPath
        })
    }
}