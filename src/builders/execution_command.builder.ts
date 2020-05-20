import { masmBineriesPath, executionCommandPrefix, dosboxDockerImage, dosboxMasmBineriesDrive, dosboxSrcDrive, dockerImageCommand } from "../../consts"

export interface IExecutionCommandBuilder {
    folderPath: string,
    masmBineryPath: string,
    executionCommandPrefix: string,
    dosboxSrcDrive: string,
    dosboxMasmBineriesDrive: string
}

export default class ExecutionCommandBuilder implements IExecutionCommandBuilder {
    folderPath: string;
    masmBineryPath: string;
    executionCommandPrefix: string;
    dosboxSrcDrive: string;
    dosboxMasmBineriesDrive: string;

    constructor (folderPath) {
        this.folderPath = `${process.cwd()}/${folderPath}`;
        this.masmBineryPath = masmBineriesPath;
        this.executionCommandPrefix = executionCommandPrefix;
        this.dosboxMasmBineriesDrive = dosboxMasmBineriesDrive;
        this.dosboxSrcDrive = dosboxSrcDrive;
    }

    public build = () => {
        return `${this.executionCommandPrefix} -v ${this.masmBineryPath}:${dosboxMasmBineriesDrive} -v ${this.folderPath}:${dosboxSrcDrive} ${dosboxDockerImage} ${dockerImageCommand}`
    }
}