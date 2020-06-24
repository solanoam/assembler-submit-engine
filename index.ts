import { now } from "moment";
import * as admin from 'firebase-admin'
import { SERVICE_ACCOUNT_CONFIG, SERVICE_ACCOUNT_URL, STORAGE_BUCKET, USER_SUBMISSIONS_FOLDER } from "./consts";
import { EventsHandler } from './src/handlers/events.handler';
import { EventController } from "./src/controller/event.controller";
import { postEventHandlerTrigger } from "./src/services/post.event.handler.trigger";
import { IEventMeta } from './src/interfaces/event.interface';
admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT_CONFIG),
  databaseURL: SERVICE_ACCOUNT_URL
});
console.log(`initialized FireBase Client!`)
const storage = admin.storage().bucket(STORAGE_BUCKET)
console.log(`initialized FireBase Bucket!`)
console.log(`listening for events...`)
admin.database().ref("usersSubmissions").on("child_added", dataSnapshot => {
  const eventMeta: IEventMeta = {...dataSnapshot.val(), id: dataSnapshot.key}
  console.log(`new event ${eventMeta.id}: ${eventMeta.taskID}, ${eventMeta.userID}, ${eventMeta.testcaseID}.`)
  new EventsHandler(new EventController(storage), new postEventHandlerTrigger()).handleEvent(eventMeta)
    .then(()=>{
      console.log(`submit-engine has finished running for event ${eventMeta.id}`)
    })
    .catch((e)=>{
      console.error(`submit-engine got an error: ${e}`)
      console.error(`${e.stack}`)
      console.trace()
    })
})







