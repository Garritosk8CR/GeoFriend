import firebase from 'firebase'
import 'firebase/firestore'


const config = {
    apiKey: "AIzaSyAWpPBsz76J28fwF_3ply7C7htnJK1FbFs",
    authDomain: "vuejs-http-8df2f.firebaseapp.com",
    databaseURL: "https://vuejs-http-8df2f.firebaseio.com",
    projectId: "vuejs-http-8df2f",
    storageBucket: "vuejs-http-8df2f.appspot.com",
    messagingSenderId: "71638027297"
}

const firebaseapp = firebase.initializeApp(config)
const firestore = firebaseapp.firestore()
firestore.settings({
    timestampsInSnapshots: true
})
export function getTimestamp() {
    return firebase.firestore.Timestamp.now()
}
export default firestore
