import express from 'express'
import path from 'path'
import {auth} from '../middewares/auth'

import {__dirname,url,port} from '../config'
import {getSadById,getUserDBbyId} from '../firebase-services/index'
import signCert from '../ass-pdf/index'
import { clearScreenDown } from 'readline'
import fs from 'fs'
const router = express.Router()
router.use(auth)
// router.get('/', function (req, res) {
    
//     res.send({ok:true})
// })
// router.use('/',express.static(path.join(__dirname, 'src/sign')))
router.get('/', async function (req, res) {
    
    // console.log('req.sad=',req.sad)
    res.sendFile(__dirname+'/sign/methods.html')
})
router.post('/', async function (req, res) {
   var cert = req.body
   const token = req.query.token
   const userid = req.userid
   const parts = token.split(' ')
   const [scheme, toke,sadid]=parts
 
   if(!userid){
    return res.status(404).send({ERRO:'Nao foi possivel identificar o id do user!!!'})
   }
   
   var sad = await getSadById(sadid).catch(erro=>{console.log({Erro:'Nao foi possivel obter sad no bd!!',erro})})
   if(!sad){
       return res.status(404).send({ERRO:'Nao foi possivel obter o documento!!!'})
   }
   var user = await getUserDBbyId(userid).catch(erro=>{console.log({Erro:'Nao foi possivel obter user in BD!!!'})})
   if(!user){
       return res.status(404).send({ERRO:'Nao foi possivel obter user in BD!!!'})
   }

   var pbip = req.publicIp
   
   var certt = cert.data
   var pass = cert.password
   
   //pdf buffer
   var pdfend=await signCert(pbip,user,certt,sad,pass).catch(erro=>{console.log({Erro:'Nao foi possivel assinar pdf!!',erro})})
   var link2={url:url+port+'/home?token='+token,data:pdfend.data}
   if(typeof pdfend == 'object'){
        res.send(link2)
   }else{
       res.send({
           Erro:'Nao foi possivel Assinar documento, verifique e insira um certificado A1 ou A3 ,Tipo: p12 ou p7',
           
    })
   }
   console.log('<=====')

})

export default (app) => app.use('/sign',router) 