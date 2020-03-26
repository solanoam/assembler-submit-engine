import initFireBase from "./initFirebase"
import {EventsHandler} from "./src/handlers/events.handler";
import { firestore } from "firebase";

export const firebaseClient: firestore.Firestore = initFireBase();

new EventsHandler().eventsScheduler();