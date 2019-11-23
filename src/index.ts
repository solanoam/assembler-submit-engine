import initFireBase from "../initFirebase"
import {EventsHandler} from "./handlers/events.handler";

export const firebaseClient: object = initFireBase();

new EventsHandler().eventsScheduler();