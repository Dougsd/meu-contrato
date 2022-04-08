
import express from 'express'
import bodyParser from 'body-parser'
import auth from './routes/authControler.js'
import signMethods from './routes/signControler.js'
import {__dirname,url,port} from './config'
import path from 'path'
import home from './routes/homeControler.js'
import signCert from './ass-pdf/index'

const app = express()

app.use(bodyParser.json({limit: '100mb',extended:true}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/',express.static(path.join(__dirname, '../cliente-side/src')))
app.get('/', function(req, res) {
    res.send({ok:true})
})

auth(app)//Rota para autenticação de cliente
signMethods(app)//Rota com metodos de assinaturas disponiveis
home(app)//Rota para selecionar documento para assinatura
app.listen(port, ()=>
console.clear(),
process.stdout.clearLine(),
console.log(`Server listening on port ${url+port}`) )
