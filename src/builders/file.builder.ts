import * as fs from "fs";
import {asmFileName} from "../../consts";
import { IEvent } from '../interfaces/event.interface';

interface IFileBuilder {
    event: IEvent
    folderPath: string;
}

export class FileBuilder implements IFileBuilder {
    event: IEvent;
    folderPath: string;

    constructor(event: IEvent, folderpath: string) {
        this.event = event
        this.folderPath = `${process.cwd()}/${folderpath}/${asmFileName}`;
    }

    public async build(){
        const { file } = this.event
        await file.download({
            destination: this.folderPath
        })
    }
}