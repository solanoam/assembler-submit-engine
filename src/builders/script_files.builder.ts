import * as fs from "fs";

interface IScriptFileBuilder {
    folderName: string
    filePaths: string[]
}

export interface IScriptFileBuilderParams {
    folderName: string
    filePaths: string[]
}

export class ScriptFilesBuilder implements IScriptFileBuilder {
    folderName: string;
    filePaths: string[];

    constructor(ScriptFileBuilderParams: IScriptFileBuilderParams) {
        const { filePaths, folderName } = ScriptFileBuilderParams;
        this.filePaths = filePaths;
        this.folderName = folderName;
    }

    public build(){
        this.filePaths.forEach((path: string) => {
            const fileName = this.getFileName(path);
            fs.createReadStream(path).pipe(fs.createWriteStream(`${this.folderName}/${fileName}`));
        })
    }

    private getFileName(path: string) {
        return path.slice(path.lastIndexOf('/')+1);
    }
}