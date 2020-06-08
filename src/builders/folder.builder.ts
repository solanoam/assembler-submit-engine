import * as fs from "fs";

interface IFolderBuilder {
    folderName: string
}

export class FolderBuilder implements IFolderBuilder{
    folderName: string;

    constructor(folderName: string) {
        this.folderName = folderName;
    }


    public async build(){
        fs.mkdirSync(this.folderName)
        
    }

}