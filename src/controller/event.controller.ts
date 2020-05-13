import {IEventController} from "../interfaces/event.controller.interface";
import {IEvent} from "../interfaces/event.interface";
import * as admin from "firebase-admin" 
import {collectionNames} from "../../consts";

export class EventController implements IEventController {
    eventsStorage: admin.storage.Storage;
    eventsBucket: string

    constructor(eventsStorage: admin.storage.Storage, eventsBucket: string) {
        this.eventsStorage = eventsStorage
        this.eventsBucket = eventsBucket
    }


    public async getEvent(path: string): Promise<IEvent> {
        console.log(this.eventsBucket)
        const files = await this.eventsStorage.bucket(this.eventsBucket).getFiles()
        //TODO make it work
        const filterdFiles = files.filter(f=>f.name.includes('path'))
        filterdFiles.forEach(f=>console.log(f.name))
        return {} as IEvent
    }

    public saveEvent(event: IEvent) {
        return {}
    }

}
