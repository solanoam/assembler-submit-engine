import { masmBineriesPath, executionCommandPrefix, dosboxDockerImage, dosboxMasmBineriesDrive, dosboxSrcDrive, dockerRunCommand } from "../../consts"
import { IExecutionCommandBuilder } from "../interfaces/execution_command.builder.interface";

/**
 * builder for the docker execution command,
 * using the other prerequisites, scripts, and consts, build a functioning and correct docker run command. 
 */
export default class ExecutionCommandBuilder implements IExecutionCommandBuilder {
    id: string
    folderPath: string;
    masmBineryPath: string;
    executionCommandPrefix: string;
    dosboxSrcDrive: string;
    dosboxMasmBineriesDrive: string;

    /**
     * Initializing the execution command builder. 
     */
    constructor (folderPath) {
        this.id = folderPath
        this.folderPath = `${process.cwd()}/${folderPath}`;
        this.masmBineryPath = masmBineriesPath;
        this.executionCommandPrefix = executionCommandPrefix;
        this.dosboxMasmBineriesDrive = dosboxMasmBineriesDrive;
        this.dosboxSrcDrive = dosboxSrcDrive;
    }

    /**
     * Main public method - builds the command. 
     */
    public build = () => {
        return `${this.executionCommandPrefix} --name ${this.id} -v ${this.masmBineryPath}:${dosboxMasmBineriesDrive} -v ${this.folderPath}:${dosboxSrcDrive} ${dosboxDockerImage} ${dockerRunCommand}`
    }
}