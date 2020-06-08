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

    public async build(){
        const fileCreations: Promise<string>[] = []

        const createNewFileOnPathPromise = (...args: any): Promise<string> => {
            const path = args[0]
            return new Promise((resolve, reject)=>{
                const fileName = this.getFileName(path)
                fs.createReadStream(path).pipe(fs.createWriteStream(`${this.folderName}/${fileName}`))
                    .on('finish', () => {
                        resolve(fileName);
                    })
                    .on('error', (err) => {
                        reject(`an error ocurred ${err}`);
                    })
            })
        }
        this.filePaths.forEach((path: string) => {
            fileCreations.push(createNewFileOnPathPromise(path));
        })
        await Promise.all(fileCreations)


    }

    private getFileName(path: string) {
        return path.slice(path.lastIndexOf('/')+1);
    }
}