import * as fs from "fs";
import { IScriptFileBuilder, IScriptFileBuilderParams } from "../interfaces/script_files.builder.interface";

/**
 * Script files builder - creates the static script files in the given folder to be used when the docker will run. 
 */
export class ScriptFilesBuilder implements IScriptFileBuilder {
    folderName: string;
    filePaths: string[];

    
    /**
     * Initializing the script file builder. 
     */
    constructor(ScriptFileBuilderParams: IScriptFileBuilderParams) {
        const { filePaths, folderName } = ScriptFileBuilderParams;
        this.filePaths = filePaths;
        this.folderName = folderName;
    }

    /**
     * Main public method - builds the script file in the given folder. 
     */
    public async build(){
        const fileCreations: Promise<string>[] = []        
        this.filePaths.forEach((path: string) => {
            fileCreations.push(this.createNewFileOnPathPromise(path));
        })
        await Promise.all(fileCreations)


    }

    /**
     * Private for creating new file in the given path.
     * wrapped in a Promise for better usage 
     */
    private createNewFileOnPathPromise = (...args: any): Promise<string> => {
        const path = args[0]
        return new Promise((resolve, reject)=>{
            const fileName = this.getFileName(path)
            fs.createReadStream(path).pipe(fs.createWriteStream(`${this.folderName}/${fileName}`))
                .on('finish', () => {
                    resolve(fileName);
                })
                .on('error', (err) => {
                    reject(`an error ocurred ${err}`);
                }
            )
        })
    }
    
    /**
     * Aux private for slicing the path correctly. 
     */
    private getFileName(path: string) {
        return path.slice(path.lastIndexOf('/')+1);
    }
}