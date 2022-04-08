
import { sign } from 'pdf-signer'
import fs from 'fs'
import {__dirname} from '../config'
import geoip from 'geoip-lite'
import {updateSad} from '../firebase-services/index'

export default async function signCert(pbip,user,certBuffer,sad,passCert){
    async function buffeeToDataUrl(buffer,type){ //base64 Browsers
        
        var datanew = type+buffer.toString('base64')
        return  datanew
    }
     function dataUrlToBuffee(doc) {//base64 Browsers
        var dataurl= doc.data
        
        var regex = /^data:.+\/(.+);base64,(.*)$/
        var matches = dataurl.match(regex)
        var ext = matches[1]
        var data = matches[2]
        var buffer = Buffer.from(data, 'base64')
        return  buffer
    }
    // var datanew = 
    async function getLocation(pbip){
        const loc =  geoip.lookup(pbip)
        const location = loc.city+','+loc.region
        return location
    }
    async function getDate(){
        const date = new Date()
        return (date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear())
    }
    async function getHours(){
        const date = new Date()
        return ('as'+''+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds())
    }
    var userOptions = {
        reason: sad.type,
        email: user.email,
        location: await getLocation(pbip),
        signerName: user.displayName,
        annotationAppearanceOptions: {
            signatureCoordinates: { left: 50, bottom: 600, right: 190, top: 760 },
            signatureDetails: [

                {
                    value: 'Tipo de assinatura: Certificado Digital',
                    fontSize: 7,
                    transformOptions: { rotate: 0, space: 1, tilt: 0, xPos: 20, yPos: 20 },
                }
                ,
                {
                    value: 'Assinado dia: '+await getDate()+' '+await getHours(),
                    fontSize: 7,
                    transformOptions: { rotate: 0, space: 1, tilt: 0, xPos: 20, yPos: 30 },
                }
                
                ,
                {
                    value: 'Assinado por: '+user.name,
                    fontSize: 7,
                    transformOptions: { rotate: 0, space: 1, tilt: 0, xPos: 20, yPos: 20 },
                },
                {
                    value: 'Plataforma: Meu Contrato',
                    fontSize: 7,
                    transformOptions: { rotate: 0, space: 1, tilt: 0, xPos: 20, yPos: 30 },
                }
                ,
    ,
            ],
        },
    }
    // if( sad.userOptions.annotationAppearanceOptions.signatureCoordinates.top == 760){
    //     userOptions.annotationAppearanceOptions.signatureCoordinates.top == (sad.userOptions.annotationAppearanceOptions.signatureCoordinates.top-100)
    //     if(sad.userOptions.annotationAppearanceOptions.signatureCoordinates.top<200){
    //         console.log('ERRO: Espaco em pagina pdf insuficiente')
    //     }
    // }
    // console.log('====>','\n',pdfBuffer.toString(),'\n','<=====')
    // const p12Buffer = fs.readFileSync(__dirname+`/ass-pdf/`+`certificate.p12`)
    // const ppdfBuffer = fs.readFileSync(__dirname+`/ass-pdf/`+`1.pdf`)
    // var newpdf = Buffer.from(pdfBuffer)
    // var cerb = Buffer.from(certBuffer)
    sad.signatures.push(userOptions)
    // console.log(ppdfBuffer)
    
      console.log(sad.signatures)  
   
    //  console.log('cert===',certBuffer) //ok is dataurl
    var cert = {data:certBuffer}
    var certt = dataUrlToBuffee(cert)
    // console.log('cert==',certt,'\n',p12Buffer)
    var type='data:application/x-pkcs12;base64,'
    var pdfBuffer = dataUrlToBuffee(sad)
    var signedPdf = await sign(pdfBuffer, certt, passCert,userOptions).catch(err=>{console.log('Erro 0 ao tentar assinar',err)})//P12 ou P7
    // console.log('pdfFim==>',typeof signedPdf)//object
    var typee='data:application/pdf;base64,'
    sad.data = await buffeeToDataUrl(signedPdf,typee).catch(err=>{console.log('Erro: nao foi possivel converter buffer em base64 ==>',err)})
    updateSad(sad).catch(err=>{console.log('Erro 0 ao atualizar sad em database'),err})
    return sad
 
}
// var user={
//     email: 'user@11eexample.com',
//     emailVerified: false,
//     phoneNumber: '+112117567890',
//     password: 'secretPassword',
//     displayName: 'John Doe',
//     photoURL: 'http://www.example.com/12345678/photo.png',
//     disabled: false,
//     type:'free'
//   }


// export async function t() {

    
// fs.writeFileSync(__dirname+`/ass-pdf/`+'1.pdf', signedPdf)
// console.log(signedPdf)
// }
// t().catch(err=>{console.log('ERRO=',err)})

  

