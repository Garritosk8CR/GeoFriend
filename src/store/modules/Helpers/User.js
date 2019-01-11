import db from '@/db'
export function GetUserById(userId, requestFunc, errorFunc = null) {
    db.collection('Users').where('id', '==', userId).get()
    .then( requestFunc)
    .catch(errorFunc ? errorFunc : error => console.log(error))
}
