export enum collectionNames {
    events = "events",
}

export const MAX_CONTAINER_TIMEOUT = 30000
export const CONTAINER_POLLING_INTERVAL = 200

export const resultsFileName = "txtDump.txt"
export const compiledFileName = "userCode.exe"

export const asmFileName = 'userCode.asm';
export const scriptFilePaths = [
    'dos/graphicModeGraphicPortDump.asm',
    'dos/graphicPortDump.asm',
    'dos/runScript.bat'
];
export const masmBineriesPath = "/home/masm"
export const executionCommandPrefix = `docker run -d`
export const dosboxDockerImage = `jgoerzen/dosbox`
export const dosboxMasmBineriesDrive = `/dos/drive_c/`
export const dosboxSrcDrive = `/dos/drive_d/`

export const DEFAULT_ENCODING = 'utf8'