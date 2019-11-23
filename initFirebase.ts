import * as fs from "fs";
import * as firebase from "firebase";

const firebaseConfig = JSON.parse(fs.readFileSync("firebaseConfig", 'utf8'));

export default () => {
    return firebase.initializeApp(firebaseConfig)
}