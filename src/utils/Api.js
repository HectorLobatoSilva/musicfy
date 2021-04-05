import firebaseApp from './Firebase'
import firebase from 'firebase'
import 'firebase/database'
const db = firebase.firestore(firebaseApp)

export const isUserAdmin = async (uid) => {
    const response = await db.collection("admins").doc(uid).get()
    return response.exists
}