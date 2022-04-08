import jwt from 'jsonwebtoken'
import {secret} from '../config'
import publicIp from 'public-ip'


export async function auth(req,res,next){
    // const authHeader= req.headers.authorization
    const authHeader= req.query.token
    // console.log('header obtido==>',authHeader) 
    
    if(!authHeader){
        return res.status(401).send({error: 'No token provided'})
    }
    //Bearer vsdjsdsdjsjkadjsd3endoi93828dj
    const parts = authHeader.split(' ')
    if(!parts.lenght ===2){
        return res.status(401).send({error: 'Token error'})
    }
    const [scheme, token,sadid]=parts
    
    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: 'Token mal formated'})
    }
    
    jwt.verify(token,secret,(err, decoded)=>{
        const idd = decoded.id
        
        req.userid=idd
        if(err){
            res.status(401).send({error: 'Token invalid'})
        }
        
         publicIp.v4().then(ip=>{
            //  console.log('IP=',ip)
            req.publicIp = ip
        }).catch(error=>{console.log('ERRO:',error)})
        return next()
    })
}