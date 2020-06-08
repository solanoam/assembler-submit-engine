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
    initDockerConsole(error, stdout: string, stderr:string): void,
    getResults(): Promise<IResults>
}

export default class ContainerHealthManager implements IContainerHealthManager{
    dockerContainerId: string
    resultsBuilder: IResultsBuilder;
    folderPath: string;
    filePath: string;
    resultsFilePath: string;
    compiledFilePath: string;
    results: IResults

    constructor (folderPath: string) {
        this.dockerContainerId= folderPath
        this.folderPath = folderPath
        this.resultsFilePath = `${this.folderPath}/${resultsFileName}`
        this.compiledFilePath = `${this.folderPath}/${compiledFileName}`
    }

    public initDockerConsole = (error, stdout: string, stderr: string): void => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`docker container is ${stdout}`)
    }

    public getResults = async ():Promise<IResults> => {
        this.manageContainer()
        return this.resultsBuilder.build()
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
                if (this.finishedRunning()){
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