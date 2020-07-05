import { exec } from 'child_process';
import { IResultsBuilder, IResults } from "../interfaces/results.handler.interface";
import { existsSync } from 'fs';
import { resultsFileName, compiledFileName, CONTAINER_POLLING_INTERVAL, MAX_CONTAINER_TIMEOUT, finishedRunningFile, compilerDumpFileName, linkerDumpFileName, linkObjName } from '../../consts';
import { IContainerHealthManager } from '../interfaces/container_health.manager.interface';
import ResultsBuilder from '../builders/results.builder';

export interface FilePaths {
    resultsFilePath: string
    finishedRunningFilePath:   string,
    compiledFilePath: string
    compilerDumpFileNamePath: string;
    linkerDumpFileNamePath: string;
    linkObjNamePath: string
}
/**
 * Health manager for the container.
 * decide when to shut the container down, or when it is finished based on internal logic
 */
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
    filePaths: FilePaths

    /**
     * Initializing the health manager. 
     */
    constructor (folderPath: string) {
        this.dockerContainerId= folderPath
        this.folderPath = folderPath
        this.buildFilePaths()
    }

    /**
     * main public method - initialize a results handler based on the container health. 
     */
    public getResults = async ():Promise<IResults> => {
        await this.manageContainer()
        return this.resultsBuilder.build()
    }

    /**
     * extract all the relevant file paths to an object to be used in the results handler. 
     */
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

    /**
     * building the actual file path based on the file name and folder path. 
     */
    private buildFilePath = (fileName: string) : string => {
        return `${this.folderPath}/${fileName}`
    }

    /**
     * private for executing kill command for the docker. 
     */
    private killDocker = (): void => {
        exec(`docker kill ${this.dockerContainerId}`, this.logShellCommand)
    }

    /**
     * private handler for correctly logging the kill command. 
     */
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

    /**
     * health management method, orchestrate the container health by polling the it's state, 
     * referenced by the file system status 
     * Wrapped by Promise for better usage
     */
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

    /**
     * Handling failure private. 
     */
    private handleFailure = () => {
        this.killDocker()
        this.resultsBuilder = new ResultsBuilder(this.filePaths, true)
    }

    /**
     * Handling success private. 
     */
    handleSuccess = () => {
        this.killDocker()
        this.resultsBuilder = new ResultsBuilder(this.filePaths, false)
    }

    /**
     * logic that decides when the docker has finished. 
     */
    private finishedRunning = (): boolean => {
        return existsSync(this.finishedRunningFilePath)
    }
    
}