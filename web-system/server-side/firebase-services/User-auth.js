import admin from 'firebase-admin'
// import saveUserDB from './index'
import bcrypt from 'bcrypt'
import { updateUserDB } from './index'
import { getUserDB } from './index'
export async function createUser(use){
    // const hash =await bcrypt.hash(use.password,10)
    // use.password=hash
    // saveUserDB(use)
    // admin
    // .auth()
    // .createUser(use)
    // .then((userRecord) => {
    //     console.log('Successfully created new user:', userRecord.uid)
        
    //     return userRecord
    // })
    // .catch((error) => {
    //     console.log('Error creating new user:', error)
    // })
}
export async function updateUser(use){
    admin
    .auth()
    .updateUser(use.uid,use)
    .then((userRecord) => {
        updateUserBD(userRecord)
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully updated user', userRecord.toJSON())
    })
    .catch((error) => {
      console.log('Error updating user:', error)
    })
}
export async function deleteUser(use){
    admin
    .auth()
    .deleteUser(use.uid)
    .then(()=>{
        deleteUser_db(use)
        console.log('Successfully deleted user')})
    .catch((error)=>{
        console.log('deleteUser(), Error deleting user:',error)
    })
}
export async function getUser(email){
    admin.
    auth().
    getUserByEmail(email)
    .then(result=>{
        return result
    })
    .catch(error=>{
        console.log('getUser() Error:',error)
       
    })
}


/*MODELO USER ESPERADO, Utilizar no frontend

*/
// var u={
//     email: 'user@11eexample.com',
//     emailVerified: false,
//     phoneNumber: '+112117567890',
//     password: 'secretPassword',
//     displayName: 'John Doe',
//     photoURL: 'http://www.example.com/12345678/photo.png',
//     disabled: false,
//     type:'free'
//   }
// createUser(u)