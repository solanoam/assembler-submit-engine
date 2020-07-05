import { IResultsBuilder, IResults } from "./results.handler.interface";

export interface IContainerHealthManager {
    dockerContainerId: string;
    resultsBuilder: IResultsBuilder;
    folderPath: string;
    resultsFilePath: string;
    compiledFilePath: string;
    finishedRunningFilePath: string;
    compilerDumpFileNamePath: string;
    linkerDumpFileNamePath: string;
    linkObjNamePath: string;
    getResults(): Promise<IResults>;
}

