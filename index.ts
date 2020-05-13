import { now } from "moment";
import * as admin from 'firebase-admin'
import axios from 'axios' 
import { EventController } from './src/controller/event.controller';

const serviceAccount = "./config/firebase/firebase.json"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://asm-learn.firebaseio.com"
});

interface IEventMeta {
  path: string,
  userID: string,
  taskID: string
}
let num;
let time
time = now()
admin.database().ref("usersSubmissions").on("child_added", dataSnapshot => {
  const { taskID, testcaseID, userID } = dataSnapshot.val()
  console.log(`new event ${dataSnapshot.key}: ${taskID}, ${userID}, ${testcaseID}. elapsed time ${now()-time}`)
  const requestPayload = {
    params : {
      token: "z^mp0a6tPS8hAQZ@RfZg^dvxKOCEw(Pc",
      eventID: dataSnapshot.key,
      userID,
      taskID,
      testcaseID,
      statusCode: 200,
      output: "147"
    }
  }
  const url = 'https://us-central1-asm-learn.cloudfunctions.net/resultFromEngine'
  time = now()
  axios.get(url, requestPayload).then(()=> console.log(`get request was sent to ${url} with payload: ${JSON.stringify(requestPayload)}. elapsed time ${now()-time}`))
})

