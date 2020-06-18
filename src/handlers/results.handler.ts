import { readFileSync } from "fs";
import { DEFAULT_ENCODING } from "../../consts";

export enum ResultsStatus {
    success=0,
    compiled=1,
    notCompiled=2
}

export interface IResults {
    resultsOut: string,
    resultsStatus: ResultsStatus,
}

export interface IResultsBuilder {
    resultsOutPath: string,
    resultsOut: string
    resultsStatus: ResultsStatus,
    build(): IResults
}

export default class ResultsBuilder implements IResultsBuilder {
    resultsOutPath: string;
    resultsOut: string;
    resultsStatus: ResultsStatus;

    constructor (resultsOutPath, resultsStatus) {
        console.log(resultsOutPath)
        this.resultsOutPath = `${process.cwd()}/${resultsOutPath}`
        this.resultsStatus = resultsStatus
        try {
            this.resultsOut = readFileSync(this.resultsOutPath, DEFAULT_ENCODING);
        }
        catch (e) {
            this.resultsOut = `not compiled`
            this.resultsStatus = ResultsStatus.notCompiled
        }
        
    }

    public build = (): IResults => {
        return {
            resultsOut: this.resultsOut,
            resultsStatus: this.resultsStatus
        }
    }
}