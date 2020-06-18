import { exec } from 'child_process';
import ResultsBuilder, { IResultsBuilder, IResults, ResultsStatus } from '../handlers/results.handler';
import { existsSync } from 'fs';
import { resultsFileName, compiledFileName, CONTAINER_POLLING_INTERVAL, MAX_CONTAINER_TIMEOUT } from '../../consts';
import { resolve } from 'url';

export interface IContainerHealthManager { 
    dockerContainerId:  string,
    resultsBuilder:     IResultsBuilder,
    folderPath:         string,
    resultsFilePath:    string,
    compiledFilePath:   string,
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

    public getResults = async ():Promise<IResults> => {
        await this.manageContainer()
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

    private manageContainer = (): Promise<void> => {
        let elapsedTime: number = 0;
        return new Promise((resolve, reject)=> {
            try {
                const intervalID: NodeJS.Timer = setInterval(()=> {
                    if (this.finishedRunning()){
                        clearInterval(intervalID)
                        console.log(`finished running => handling success`)
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
        this.resultsBuilder = new ResultsBuilder(this.compiledFilePath, this.finishedCompiling ? ResultsStatus.compiled : ResultsStatus.notCompiled)
    }

    handleSuccess = () => {
        this.killDocker()
        this.resultsBuilder = new ResultsBuilder(this.resultsFilePath, ResultsStatus.success)
    }

    private finishedRunning = (): boolean => {
        return existsSync(this.resultsFilePath)
    }
    private finishedCompiling = (): boolean => {
        return existsSync(this.compiledFilePath)
    }
    
}