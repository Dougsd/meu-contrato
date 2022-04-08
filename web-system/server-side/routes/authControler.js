import express from 'express'
import { getUser, updateUser, deleteUser,createUser } from '../firebase-services/User-auth'
import {__dirname,secret,url,port} from '../config'
import path from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {getUserDB,saveUserDB} from '../firebase-services/index'
const router = express.Router()
function generateToken(params={}){
   return jwt.sign(params,secret,{expiresIn:3600})
}
router.post('/register',async (req, res) =>{
    const {email}=req.body
    
        var extractUser =await req.body
        //Verifica se o email ja foi cadastrado
        if(await getUserDB(email)){
           return res.status(400).send({ error: 'User already exists'})
           
        }
        //Cria conta
        
        extractUser.emailVerified= false
        extractUser.disabled=false
        saveUserDB(extractUser).catch(erro=>{console.log({Erro:'Erro: createUser(), nao foi possivel criar conta!, ',erro})})
        
        var aux=null;
        var use = await getUserDB(email).catch(erro=>{console.log({Erro:'Nao foi possivel obter User!! getUserDB()' ,erro})})
        for (var prop in use) {
            const user=use[prop]
            aux=user
          } 
          const user=aux 
          user.password= undefined
         console.log('user.id==>',user.id)
         const token=generateToken({id:user.id})
         const link={url:url+port+'/home?token=Bearer '+token}
         res.send(link.url)
        // res.send({
        //     user,
        //     token:
        // })
    
})
router.get('/register',async (req, res) =>{
    res.sendFile(__dirname+'/auth/cd.html')
})
// router.use('/',express.static(path.join(__dirname, 'src/auth')))
router.get('/',async (req, res) =>{
    try {
        
        res.sendFile(__dirname+'/auth/login.html')
    } catch (error) {
        res.status(401).send({error: 'file not found'})
    }
    
})

router.post('/authenticate', async(req,res) =>{
    const {email, password} = req.body 
    var use =await getUserDB(email)
    var aux=null;
    // console.log('---',use.id)
    for (var prop in use) {
        const user=use[prop]
        aux=user
      } 
      const user=aux
            
    if(!user){
        return res.status(400).send({error: 'User not found!'})
    }
    if(!await bcrypt.compare(password,user.password)){
        return res.status(400).send({error:'Invalid password'})
    }
    user.password = undefined
    const token=generateToken({id:user.id})

    const link={url:url+port+'/home?token=Bearer '+token}
     res.send(link.url)
    // res.location(link.url)
    // res.redirect('../home?token=Bearer '+token)
    // console.log(res.get('location'))
    
    
})

export default (app) => app.use('/auth',router) 

/*MODELO USER ESPERADO, Utilizar no frontend
{
    email: 'user@example.com',
    emailVerified: false,
    phoneNumber: '+11234567890',
    password: 'secretPassword',
    displayName: 'John Doe',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false,
  }
*/