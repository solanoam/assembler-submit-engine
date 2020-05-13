import { exec } from 'child_process';
import ResultsBuilder, { IResultsBuilder, IResults, ResultsStatus } from '../handlers/results.handler';
import { existsSync } from 'fs';
import { resultsFileName, compiledFileName, CONTAINER_POLLING_INTERVAL, MAX_CONTAINER_TIMEOUT } from '../../consts';

export interface IContainerHealthManager { 
    dockerContainerId:  string,
    resultsBuilder:     IResultsBuilder,
    folderPath:         string,
    resultsFilePath:    string,
    compiledFilePath:   string,
    initDocker(error, stdout: string, stderr:string): void,
    getResults(): IResults
}

export default class ContainerHealthManager implements IContainerHealthManager{
    dockerContainerId: string
    resultsBuilder: IResultsBuilder;
    folderPath: string;
    filePath: string;
    resultsFilePath: string;
    compiledFilePath: string;
    results: IResults

    constructor (folderPath) {
        this.folderPath = folderPath
        this.resultsFilePath = `${this.folderPath}/${resultsFileName}`
        this.compiledFilePath = `${this.folderPath}/${compiledFileName}`
    }

    public initDocker = (error, stdout: string, stderr: string): void => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        this.setDockerContainerId(stdout)
        this.manageContainer()
    }

    public getResults = ():IResults => this.resultsBuilder.build()

    private setDockerContainerId = (dockerContainerId: string): void => {
        this.dockerContainerId = dockerContainerId
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
        console.log(stdout)
    }

    private manageContainer = (): void => {
        let elapsedTime: number = 0;
        while (elapsedTime <= MAX_CONTAINER_TIMEOUT) {
            setTimeout(()=> {
                if (this.finishedRunning){
                    return this.handleSuccess()
                }
            }, CONTAINER_POLLING_INTERVAL)
            elapsedTime += CONTAINER_POLLING_INTERVAL
        }
        this.handleFailure()
    }

    private handleFailure = () => {
        this.killDocker()
        this.resultsBuilder = new ResultsBuilder("", this.finishedCompiling ? ResultsStatus.compiled : ResultsStatus.notCompiled)
    }

    handleSuccess = () => {
        this.killDocker()
        this.resultsBuilder = new ResultsBuilder(this.resultsFilePath, ResultsStatus.success)
    }

    private finishedRunning = (): boolean => existsSync(this.resultsFilePath)
    private finishedCompiling = (): boolean => existsSync(this.compiledFilePath)
}