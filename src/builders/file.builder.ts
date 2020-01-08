import * as fs from "fs";
import {asmFileName} from "../../consts";

interface IFileBuilder {
    code: string
}

export class FileBuilder implements IFileBuilder {
    code: string;

    constructor(code: string) {
        this.code = code
    }

    public build(){
        fs.appendFile(asmFileName, this.code, this.handlePostFileBuild());
    }

    private handlePostFileBuild() {
        return function (err) {
            if (err) throw err;
        };
    }
}