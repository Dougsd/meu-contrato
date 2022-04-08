
function getIP(json) {
           assinatura.dispositivo.ip=  json.ip;
      }
 var assinatura = {
        dispositivo:{
            ip:""
        },
        data:"",
 
    }
    now = new Date;
    var data = now.getDate()+'/'+(now.getMonth()+1)+'/'+now.getFullYear()+' às '+now.getHours()+':'+now.getMinutes();
    assinatura.data=data;

