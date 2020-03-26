import * as fs from "fs";
import {asmFileName} from "../../consts";

interface IFileBuilder {
    code: string
    folderPath: string
}

export class FileBuilder implements IFileBuilder {
    code: string;
    folderPath: string;

    constructor(code: string, path: string) {
        this.code = code;
        this.folderPath = path;
    }

    public build(){
        fs.appendFile(`${this.folderPath}/${asmFileName}`, this.code, this.handlePostFileBuild());
    }

    private handlePostFileBuild() {
        return function (err) {
            if (err) throw err;
        };
    }
}