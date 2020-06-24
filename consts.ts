export enum collectionNames {
    events = "events",
}

export const MAX_CONTAINER_TIMEOUT = 30000
export const CONTAINER_POLLING_INTERVAL = 200

export const resultsFileName = "TD.txt"
export const compiledFileName = "UC.exe"
export const compilerDumpFileName = "CD.TXT"
export const linkerDumpFileName = "LD.TXT"
export const linkObjName = "UCO.OBJ"
export const finishedRunningFile = 'RF.txt'

export const asmFileName = 'UC.asm';
export const scriptFilePaths = [
    'dos/GMGPD.asm',
    'dos/GPD.asm',
    'dos/RS.bat'
];
export const masmBineriesPath = "/Users/noam5456/Downloads/masm611"
export const executionCommandPrefix = `docker run -d`
export const dosboxDockerImage = `assemlearn-engine-docker:latest`
export const dosboxMasmBineriesDrive = `/dos/drive_c/`
export const dosboxSrcDrive = `/dos/drive_d/`
export const dockerImageCommand = '/usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf'

export const DEFAULT_ENCODING = 'utf8'
export const POST_EVENT_HANDLER_ENDPOINT = 'https://us-central1-asm-learn.cloudfunctions.net/resultFromEngine'
export const POST_EVENT_HANDLER_ENDPOINT_TOKEN = "z^mp0a6tPS8hAQZ@RfZg^dvxKOCEw(Pc"
export const SERVICE_ACCOUNT_CONFIG = "./config/firebase/firebase.json"
export const SERVICE_ACCOUNT_URL = "https://asm-learn.firebaseio.com"

export const USER_SUBMISSIONS_FOLDER = 'usersSubmissions'
export const STORAGE_BUCKET = 'gs://asm-learn.appspot.com/'