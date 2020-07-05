import { FilePaths } from "../managers/container_health.manager";

export interface IResultsBuilder {
    output: string;
    status: ResultsStatus;
    filePaths: FilePaths;
    build(): IResults;
}

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