async function writeUserData(pass,input_name, input_sbname,input_email, input_fone,input_cpf,input_imageUrl) {
  //  await database.ref('users/'+userid).set();
    var user = {
      displayName: input_name+' '+input_sbname,
      email: input_email,
      password:pass,
      photoURL: input_imageUrl,
      phoneNumber:input_fone,
      cpf:input_cpf,
      disabled:false
    }
   
    var req = new XMLHttpRequest()   
    req.overrideMimeType("application/json")
    req.open('POST', '/auth/register', true)
    
    req.onload  = function() {
       var jsonResponse = req.response
      //  console.log('Link=',jsonResponse)
       window.location.href = jsonResponse
    }
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    req.send(JSON.stringify(user))
}

async function writeDocumento(obj){
  var myRef = await firebase.database().ref('sad/');
  myRef.push(obj);
}


// We've appended a new message to the message_list location.

 function qtdDownloads(contrato_name,b){
  console.log('b='+b)
  // A post entry.
  var postData = {
    qtd: b,
    
  };

  var updates = {};
  updates['/contratos/' + contrato_name] = postData;
  return firebase.database().ref().update(updates);
 }


