import { exec } from 'child_process';
import ResultsBuilder, { IResultsBuilder, IResults, ResultsStatus } from '../handlers/results.handler';
import { existsSync } from 'fs';
import { resultsFileName, compiledFileName, CONTAINER_POLLING_INTERVAL, MAX_CONTAINER_TIMEOUT, finishedRunningFile, compilerDumpFileName, linkerDumpFileName, linkObjName } from '../../consts';

export interface IContainerHealthManager { 
    dockerContainerId:  string,
    resultsBuilder:     IResultsBuilder,
    folderPath:         string,
    resultsFilePath:    string,
    compiledFilePath:   string,
    finishedRunningFilePath:   string,
    compilerDumpFileNamePath: string;
    linkerDumpFileNamePath: string;
    linkObjNamePath: string
    getResults(): Promise<IResults>
}

export interface filePaths {
    resultsFilePath: string
    finishedRunningFilePath:   string,
    compiledFilePath: string
    compilerDumpFileNamePath: string;
    linkerDumpFileNamePath: string;
    linkObjNamePath: string
}
export default class ContainerHealthManager implements IContainerHealthManager{
    dockerContainerId: string
    resultsBuilder: IResultsBuilder;
    folderPath: string;
    filePath: string;
    resultsFilePath: string;
    compiledFilePath: string;
    results: IResults
    finishedRunningFilePath: string;
    compilerDumpFileNamePath: string;
    linkerDumpFileNamePath: string;
    linkObjNamePath: string
    filePaths: filePaths

    constructor (folderPath: string) {
        this.dockerContainerId= folderPath
        this.folderPath = folderPath
        this.buildFilePaths()
    }

    public getResults = async ():Promise<IResults> => {
        await this.manageContainer()
        return this.resultsBuilder.build()
    }

    private buildFilePaths = (): void => {
        this.resultsFilePath = this.buildFilePath(resultsFileName)
        this.finishedRunningFilePath = this.buildFilePath(finishedRunningFile)
        this.compiledFilePath = this.buildFilePath(compiledFileName)
        this.compilerDumpFileNamePath = this.buildFilePath(compilerDumpFileName)
        this.linkerDumpFileNamePath = this.buildFilePath(linkerDumpFileName)
        this.linkObjNamePath = this.buildFilePath(linkObjName)

        this.filePaths = {
            resultsFilePath: this.resultsFilePath,
            finishedRunningFilePath: this.finishedRunningFilePath,
            compiledFilePath: this.compiledFilePath,
            compilerDumpFileNamePath: this.compilerDumpFileNamePath,
            linkerDumpFileNamePath: this.linkerDumpFileNamePath,
            linkObjNamePath: this.linkObjNamePath
        }
    }

    private buildFilePath = (fileName: string) : string => {
        return `${this.folderPath}/${fileName}`
    }

    private killDocker = (): void => {
        exec(`docker kill ${this.dockerContainerId}`, this.logShellCommand)
    }

    private logShellCommand = (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`killing docker container - ${stdout}`)
    }

    private manageContainer = (): Promise<void> => {
        let elapsedTime: number = 0;
        return new Promise((resolve, reject)=> {
            try {
                const intervalID: NodeJS.Timer = setInterval(()=> {
                    if (this.finishedRunning()){
                        clearInterval(intervalID)
                        console.log(`finished running, docker ${this.dockerContainerId}`)
                        this.handleSuccess()
                        resolve()
                    }
                    elapsedTime += CONTAINER_POLLING_INTERVAL 
                    if (elapsedTime >= MAX_CONTAINER_TIMEOUT) {
                        clearInterval(intervalID)
                        console.log(`failed, killing docker ${this.dockerContainerId}`)
                        this.handleFailure()
                        resolve()
                    }
                }, CONTAINER_POLLING_INTERVAL)
            }
            catch (e){
                reject(e)
            }
        })
        
    }

    private handleFailure = () => {
        this.killDocker()
        this.resultsBuilder = new ResultsBuilder(this.filePaths, true)
    }

    handleSuccess = () => {
        this.killDocker()
        this.resultsBuilder = new ResultsBuilder(this.filePaths, false)
    }

    private finishedRunning = (): boolean => {
        return existsSync(this.finishedRunningFilePath)
    }
    
}