/**
 * Docker max runtime in the engine
 */
export const MAX_CONTAINER_TIMEOUT = 30000

/**
 * interval polling the file system status each docker volume
 */
export const CONTAINER_POLLING_INTERVAL = 200

/**
 * given name for the text dump from the dos env
 */
export const resultsFileName = "TD.txt"

/**
 * given name for the compiled file from the dos env
 */
export const compiledFileName = "UC.exe"

/**
 * given name for the compiler dump from the dos env
 */
export const compilerDumpFileName = "CD.TXT"

/**
 * given name for the linker dump from the dos env
 */
export const linkerDumpFileName = "LD.TXT"

/**
 * given name for the linked obj file from the dos env
 */
export const linkObjName = "UCO.OBJ"

/**
 * given name for the finished running flag from the dos env
 */
export const finishedRunningFile = 'RF.txt'

/**
 * given name for the user code file from the dos env
 */
export const asmFileName = 'UC.asm';

/**
 * paths for the static script files in the host file system
 */
export const scriptFilePaths = [
    'dos/GMGPD.asm',
    'dos/GPD.asm',
    'dos/RS.bat'
];

/**
 * path for the masm lib on the host file system
 */
export const masmBineriesPath = "/Users/noam5456/Downloads/masm611"

/**
 * docker execution command prefix
 */
export const executionCommandPrefix = `docker run -d`

/**
 * docker image name
 */
export const dosboxDockerImage = `assemlearn-engine-docker:latest`

/**
 * command to run the docker image with
 */
export const dockerRunCommand = '/usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf'

/**
 * dosbox drive to mount the masm lib to
 */
export const dosboxMasmBineriesDrive = `/dos/drive_c/`


/**
 * dosbox drive to mount the source code to
 */
export const dosboxSrcDrive = `/dos/drive_d/`

/**
 * post event endpoint url
 */
export const POST_EVENT_HANDLER_ENDPOINT = 'https://us-central1-asm-learn.cloudfunctions.net/resultFromEngine'

/**
 * post event endpoint token
 */
export const POST_EVENT_HANDLER_ENDPOINT_TOKEN = "z^mp0a6tPS8hAQZ@RfZg^dvxKOCEw(Pc"

/**
 * path for firebase config 
 */
export const SERVICE_ACCOUNT_CONFIG = "./config/firebase/firebase.json"

/**
 * service account url for firebase init
 */
export const SERVICE_ACCOUNT_URL = "https://asm-learn.firebaseio.com"


/**
 * RTDB user submission table name
 */
export const USER_SUBMISSIONS_FOLDER = 'usersSubmissions'

/**
 * storage bucket on firebase
 */
export const STORAGE_BUCKET = 'gs://asm-learn.appspot.com/'
export const DEFAULT_ENCODING = 'utf8'