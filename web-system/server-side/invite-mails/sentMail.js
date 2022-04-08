import json from '../meta.json'
// import 
// const  json  =  require ('./meta.json')
// const admin = require('firebase-admin')
import nodemailer from 'nodemailer'
// const nodemailer = require("nodemailer")
import hbs from 'nodemailer-express-handlebars'
// var hbs = require('nodemailer-express-handlebars')
import {google} from 'googleapis'
// const {google} = require('googleapis')
import path from 'path'
import {__dirname,url,port} from '../config'
// const path = require('path')
// admin.initializeApp()

const oAuth2Client = new google.auth.OAuth2(json.CLIENT_ID,json.CLIENT_SECRET,json.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: json.REFRESH_TOKEN })
export const getListInvites = function getListaAssinantes(documento){//retorna array com e-mails dos convidados
  var lista = documento.assinantes
   var invites = []  
   if(Array.isArray(lista)){
      for(var i=0; i<lista.length; i++){
            invites.push(lista[i].email)
      }
    }
    return invites
}

export  const sendMail = async function sendMail(invites){
  try{
    const accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'contato@thehash.tech',
        clientId: json.CLIENT_ID,
        clientSecret:json.CLIENT_SECRET,
        refreshToken: json.REFRESH_TOKEN,
        accessToken: accessToken
      }
    })
    transport.use('compile',hbs({
        viewEngine: {
          extName: ".handlebars",
          partialsDir: path.resolve(__dirname+port+'/invite-mails/', "views"),
          defaultLayout: false,
        },
        viewPath: path.resolve(__dirname+'/invite-mails/', "views"),
        extName: ".handlebars",
    }));
console.log('foiiiii',invites)
    const mailOptions = {
      from: '"Meu contrato 📝" <meucontratoServer@example.com>',  
      to: invites,
      subject: "Solicitação para assinatura digital.",
      // text: "Plaintext version of the message",
      // html: "<p>HTML version of the message</p>"
      template:"home"  
    }
    
    const result = await transport.sendMail(mailOptions).catch(err=>{
     console.log({error:err}) 
    })
    
  }catch (error){
    return error
  }
}
   


