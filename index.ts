import * as admin from 'firebase-admin'
import {Bucket} from "@google-cloud/storage"
import { SERVICE_ACCOUNT_CONFIG, SERVICE_ACCOUNT_URL, STORAGE_BUCKET, USER_SUBMISSIONS_FOLDER } from "./consts";
import { EventHandler } from './src/handlers/events.handler';
import { EventController } from "./src/controller/event.controller";
import { PostEventHandlerTrigger } from "./src/services/post_event_handler_trigger.service";
import { IEventMeta } from './src/interfaces/event.interface';

admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT_CONFIG),
  databaseURL: SERVICE_ACCOUNT_URL
});
console.log(`initialized FireBase Client!`)
/**
 * Initializing the firebase file storage connection. 
 */
const storage: Bucket = admin.storage().bucket(STORAGE_BUCKET) as unknown as Bucket
console.log(`initialized FireBase Bucket!`)
console.log(`listening for events...`)

/**
 * Initializing the firebase RTDB connection. later will be attached to a callback, using google's sdk (using .on method) 
 */
const RTDB = admin.database().ref("usersSubmissions")
RTDB.on("child_added", dataSnapshot => {
  const eventMeta: IEventMeta = {...dataSnapshot.val(), id: dataSnapshot.key}
  console.log(`new event ${eventMeta.id}: ${eventMeta.taskID}, ${eventMeta.userID}, ${eventMeta.testcaseID}.`)
  new EventHandler(new EventController(storage), new PostEventHandlerTrigger()).handle(eventMeta)
    .then(()=>{
      console.log(`submit-engine has finished running for event ${eventMeta.id}`)
    })
    .catch((e)=>{
      console.error(`submit-engine got an error: ${e}`)
      console.error(`${e.stack}`)
      console.trace()
    })
})







