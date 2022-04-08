//database config
import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import {getDatabase} from 'firebase-admin/database'
import bcrypt from 'bcrypt'
var sa= fs.readFileSync(path.join('firebase-services/acountConfig.json'),'utf-8')
//databse config
const firebaseConfig = {
    credential:admin.credential.cert(JSON.parse(sa)),
    databaseURL: "https://efcaz-f8ca9-default-rtdb.firebaseio.com",
}

admin.initializeApp(firebaseConfig)
const db=getDatabase()
const refUsers = db.ref('users')

//database ponteiros / rotas para dados / referencias 

// database USERS
export async function saveUserDB(User){
    const hash = await bcrypt.hash(User.password,10)
    User.password=hash
    var key_push = db.ref("users").push()
    var r =db.ref('users/'+key_push.key)
    User.id=key_push.key
    User.type='member'
    r.set(User)
    console.log('--save--user')
}
export async function updateUserDB(User){
    var ref = db.ref("users/"+User.id)
    ref.update(User)
    console.log('--update--user') 
}
export async function getUserDB(mail){
    // console.log(mail)
    
    return db.ref('users').orderByChild('email')
    .equalTo(mail).once("value")
    .then(function (snapshot){
          var user = snapshot.val()
         
          return user
    }).catch((error) => {console.log('ERRO+++>','User not found in db',error)}) 
    
    
}
export async function getUserDBbyId(idUser){
    
    return db.ref('users/'+idUser).once("value")
    .then(function (snapshot){
          const user = snapshot.val()
           return user
    }).catch((error) => {console.log('ERRO+++>','User not found in db',error)}) 
    
    
}
//database documents
export async function saveSad(sad,user){
    const key = db.ref('sad').push()
    var sadRef = db.ref('sad/'+key.key)
    sad.id= key.key
    sad.responsavel.push(user)
    sadRef.set(sad)
    console.log('--save--sad')
    return sad.id
}
export async function updateSad(sad){
    var ref = db.ref("users/"+sad.id)
    ref.update(sad)
    console.log('--update--sad') 
}
export async function getSadById(sadid){
    return db.ref('sad/'+sadid).once("value")
    .then(function (snapshot){
          const user = snapshot.val()
           return user
    }).catch((error) => {console.log('ERRO+++>','Sad not found in db',error)}) 
}
export const auth = admin.auth()

// database SAO (Solicitacões de assinaturas online.)
