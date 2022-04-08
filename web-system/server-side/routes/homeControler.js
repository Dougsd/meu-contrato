import express from 'express'
import path from 'path'
import {auth} from '../middewares/auth'
import {__dirname,url,port} from '../config'
import jwt from 'jsonwebtoken'
import {saveSad,getUserDBbyId} from '../firebase-services/index'
import {sendMail, getListInvites} from '../invite-mails/sentMail'
import fs from 'fs'
const router = express.Router()
router.use(auth)

router.get('/', async function (req, res) {
    // console.log('req.query.token=',req.query.token)
    // console.log('redirecionado aqui home get')
    res.sendFile(__dirname+'/home/index.html')

})

router.post('/sad', async function (req, res) {//SAD (SOLICITACAO DE ASSINATURA DE DOCUMENTO)
    
    const token =req.query.token
    var doc = req.body
    const userid=req.userid
    // console.log('doc.data=',doc)
    if(userid && doc){  
    //ENVIA CONVITES PARA ASSINATURA DE DOCUMENTO VIA EMAIL
        // const invites=getListInvites(doc)
        // sendMail(invites)
        //     .then(()=> console.log("Email sent..."))
        //     .catch((error)=> console.log('SendEmail Error=>',error.message))
    //SAVE SAD DATABASE
        //tenta buscar user no db
        var user = await getUserDBbyId(userid)
        if(user){
            //Adiciona ips publicos da requisição
            doc.publicIp=req.publicIp
            // console.log('docdata',doc.data)
            //Inseri user na sad e salva no db
            req.sadid= await saveSad(doc,user).catch((err)=> console.log({error: 'Nao foi possivel salvar SAD!!!',err }))
        }else{
            console.log({erro:'User not valid'})
        }
        // 
        
        // console.log('====',req.sadid)
        const link={url:url+port+'/sign?token='+token+' '+''+req.sadid} 
        const link2={url:url+port+'/home?token='+token}
        
        for (let index = 0; index < doc.assinantes.length; index++) {
            const element = doc.assinantes[index]
            
            if(user.email == element.email){
               return res.send(
                    link.url
                )
            }
        }
        
        res.send(link2.url)
    }else{
        res.status(401).send({error: 'User ou documento nao informado '})
    }

})

export default (app) => app.use('/home',router) 