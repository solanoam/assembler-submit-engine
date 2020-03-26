import { exec } from 'child_process';
import { stderr } from 'process';
export default class ContainerHealthManager {
    dockerContainerId: string

    constructor () {

    }

    public initDocker = (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        this.dockerContainerId = stdout
    }

    private killDocker = () => {
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


}