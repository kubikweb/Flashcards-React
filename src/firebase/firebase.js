import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "..."
};

firebase.initializeApp(config);
const db = firebase.firestore();

export {db}
export default firebase;