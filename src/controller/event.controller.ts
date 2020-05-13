import {IEventController} from "../interfaces/event.controller.interface";
import {IEvent, IEventMeta} from "../interfaces/event.interface";
import { STORAGE_BUCKET, USER_SUBMISSIONS_FOLDER } from "../../consts";
import { now } from 'moment';
import * as util from "util"

export class EventController implements IEventController {
    eventsBucket: string = STORAGE_BUCKET
    userSubmissionFolder: string = USER_SUBMISSIONS_FOLDER
    eventsStorage;

    constructor(eventsStorage) {
        this.eventsStorage = eventsStorage
    }


    public async getEvent(eventMeta: IEventMeta): Promise<IEvent> {
        const {userID, taskID, testcaseID} = eventMeta
        const path = `${this.userSubmissionFolder}/${userID}/${taskID}`
        console.log(`path is ${path}`)
        const getFilesPromise = (...args): Promise<any[]> => {
            return new Promise((resolve, reject)=>{
                this.eventsStorage.getFiles(...args, (err, files)=>{
                    if (err) reject(err)
                    resolve(files)
                })
            })
        }
        const files: any[] = await getFilesPromise({
            directory: path
        })
        console.log(`len: ${files.length}`)
        const filterdFiles = files.filter(f=>f.name.includes(`${path}/${testcaseID}`))
        filterdFiles.forEach(f=>console.log(f.name))
        const event: IEvent = {...eventMeta, eventTimestamp: now(), file: filterdFiles[0] }

        return event as IEvent
    }
}
