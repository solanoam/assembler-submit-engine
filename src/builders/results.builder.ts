import { readFileSync, existsSync } from "fs";
import { DEFAULT_ENCODING } from "../../consts";
import { FilePaths } from "../managers/container_health.manager";
import { IResultsBuilder, ResultsStatus, IResults } from "../interfaces/results.handler.interface";

/**
 * Results builder, builds the results from the given state of the container.
 * uses logic the correctly asses the status referacnced the container file system 
 */
export default class ResultsBuilder implements IResultsBuilder {
    output: string;
    status: ResultsStatus;
    filePaths: FilePaths;

    /**
     * Initializing the results builder. 
     */
    constructor (filePaths, timeout) {
        this.initPaths(filePaths)
        this.handleResultsStatus(timeout)
    }

    /**
     * general aux private for getting a file output in the given path . 
     */
    private getFileOutput = (filePath: string) => {
        try {
            return readFileSync(filePath, DEFAULT_ENCODING);
        }
        catch (e) {
            return `out source unavailable ${e}`
        }
    }

    /**
     * initializing the different paths to be correct and relative to the current process. 
     */
    private initPaths = (filePaths: FilePaths) => {
        const initialledFilePaths = {}
        for (const [key, value] of Object.entries(filePaths)) {
            initialledFilePaths[key] = `${process.cwd()}/${value}`
        }
        this.filePaths = initialledFilePaths as FilePaths
    }
    /**
     * High level handler that calls different calculations whether runtime timeout occurred or not
     */
    private handleResultsStatus = (timeout: Boolean): void => {
        if (timeout) {
            this.calcTimeoutResultStatus()
        }
        else {
            this.calcFinishedResultStatus()
        }
    }

    /**
     * Calculate Timeout statuses 
     */
    private calcTimeoutResultStatus = () : void => {
        if (this.isCompilerTimeout()) {
            this.status = ResultsStatus.compileTimeout
            this.output = `compiler timeout - cannot acquire compiler dump`
        }
        else {
            this.status = ResultsStatus.runtimeTimeout
            this.output = this.getFileOutput(this.filePaths.compilerDumpFileNamePath)
        }
    }

    /**
     * Calculate finish statuses 
     */
    private calcFinishedResultStatus = () : void => {
        if (this.isNotCompiled()){
            this.status = ResultsStatus.notCompiled
            this.output = this.getFileOutput(this.filePaths.compilerDumpFileNamePath)
        }
        else {
            this.status = ResultsStatus.success
            this.output = this.getFileOutput(this.filePaths.resultsFilePath)
        }
    }

    /**
     * Private logic for compiler timeout calculation 
     */
    private isCompilerTimeout = (): Boolean => {
        return !existsSync(this.filePaths.compilerDumpFileNamePath)
    }

    /**
     * Private logic for compiler error calculation
     */
    private isNotCompiled = (): Boolean => {
        return !existsSync(this.filePaths.compiledFilePath)
    }

    /**
     * Main public method, builds the results
     */
    public build = (): IResults => {
        return {
            output: this.output,
            status: this.status
        }
    }
}