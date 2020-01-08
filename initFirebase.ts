import * as fs from "fs";
import * as firebase from "firebase/app";

const firebaseConfig = JSON.parse(fs.readFileSync("firebaseConfig", 'utf8'));

export default (): firebase.firestore.Firestore => {
    const firebaseClient = firebase.initializeApp(firebaseConfig);
    return firebaseClient.firestore()
}