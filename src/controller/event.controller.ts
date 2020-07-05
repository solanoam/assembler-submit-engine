import {IEventController} from "../interfaces/event.controller.interface";
import {IEvent, IEventMeta} from "../interfaces/event.interface";
import { STORAGE_BUCKET, USER_SUBMISSIONS_FOLDER } from "../../consts";
import { now } from 'moment';
import { Bucket, File } from "@google-cloud/storage";

/**
 * A Controller class that holds logic to get events from the firebase storage.
 * used to return an event (IEvent) from a given event Meta (IEventMeta)
 */
export class EventController implements IEventController {
    eventsBucket: string = STORAGE_BUCKET
    userSubmissionFolder: string = USER_SUBMISSIONS_FOLDER
    eventsStorage: Bucket;


    /**
     * Initializing the Controller. 
     */
    constructor(eventsStorage) {
        this.eventsStorage = eventsStorage
    }

    /**
     * Private for building the firebase storage file path from the event meta. 
     */
    private buildStoragePath = (eventMeta: IEventMeta): string => {
        const {userID, taskID} = eventMeta
        return `${this.userSubmissionFolder}/${userID}/${taskID}`
    }

    
    /**
     * Private for getting files api from google's firebase. wrapping this api in 
     * Promise for better management
     */
    private getFilesPromise = (...args): Promise<File[]> => {
        return new Promise((resolve, reject)=>{
            this.eventsStorage.getFiles(...args, (err, files)=>{
                if (err) reject(err)
                resolve(files)
            })
        })
    }
    
    
    /**
     * getting all the files that related to the relevant path 
     * and performing filtering in order to ensure only 1 relevant event.
     * fetching the file api from firebase and serving as an event.
     */
    public async getEvent(eventMeta: IEventMeta): Promise<IEvent> {
        const {testcaseID} = eventMeta
        const path = this.buildStoragePath(eventMeta)
        
        const files: File[] = await this.getFilesPromise({
            directory: path
        })
        const filterdFiles = files.filter(f=>f.name.includes(`${path}/${testcaseID}`))
        const event: IEvent = {...eventMeta, eventTimestamp: now(), file: filterdFiles[0] }

        return event
    }
}
