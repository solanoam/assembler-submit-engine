import { readFileSync, existsSync } from "fs";
import { DEFAULT_ENCODING } from "../../consts";
import { time } from 'console';
import { isThisTypeNode } from "typescript";
import { filePaths } from "../managers/container_health.manager";

export enum ResultsStatus {
    success=200,
    compileTimeout=408,
    notCompiled=417,
    runtimeError=420,
    tooManyRequests=429,
    maliciousUserCode=451,
    runtimeTimeout=508,
}

export interface IResults {
    output: string,
    status: ResultsStatus,
}

export interface IResultsBuilder {
    output: string
    status: ResultsStatus,
    filePaths: filePaths
    build(): IResults
}

export default class ResultsBuilder implements IResultsBuilder {
    output: string;
    status: ResultsStatus;
    filePaths: filePaths;

    constructor (filePaths, timeout) {
        this.initPaths(filePaths)
        this.handleResultsStatus(timeout)
    }

    private getFileOutput = (filePath: string) => {
        try {
            return readFileSync(filePath, DEFAULT_ENCODING);
        }
        catch (e) {
            return `out source unavailable ${e}`
        }
    }

    private initPaths = (filePaths: filePaths) => {
        const initialledFilePaths = {}
        for (const [key, value] of Object.entries(filePaths)) {
            initialledFilePaths[key] = `${process.cwd()}/${value}`
        }
        this.filePaths = initialledFilePaths as filePaths
    }
    private handleResultsStatus = (timeout: Boolean): void => {
        if (timeout) {
            this.calcTimeoutResultStatus()
        }
        else {
            this.calcFinishedResultStatus()
        }
    }

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

    private isCompilerTimeout = (): Boolean => {
        return !existsSync(this.filePaths.compilerDumpFileNamePath)
    }

    private isNotCompiled = (): Boolean => {
        return !existsSync(this.filePaths.compiledFilePath)
    }

    public build = (): IResults => {
        return {
            output: this.output,
            status: this.status
        }
    }
}