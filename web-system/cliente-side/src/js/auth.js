

const doc = document.getElementById("form")
doc.addEventListener("submit",(evento)=>{
    var mail = document.getElementById("mail").value
    var pass =  document.getElementById("pass").value
    var req = new XMLHttpRequest()
    req.overrideMimeType("application/json")
    req.open('POST', '/auth/authenticate', true)
    req.onload  = function() {
     window.location.href= req.response
      //  console.log(jsonResponse)
       
      //    jsonResponse.url
    }
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    req.send(JSON.stringify({email:mail,password:pass}))
    

    // auth.signInWithEmailAndPassword(email, password)
    // .then(() => {
    //     var user = auth.currentUser;
    //     if (user !== null) {
    //             window.location.href = "sys.html";
    //     }else{
    //         window.alert("Verifique se seu e-mail e senha estão corretos..");
    //     }
    // })
    // .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log("Erro:" +errorCode);
    //     console.log("Erro:" +errorMessage);
    // });
  evento.preventDefault()
})

// var lg_google= document.getElementById('lg_google');
// lg_google.addEventListener("click",(e)=>{
//     //console.log("evento funfou!!")

//     var provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider)
//   .then((result) => {
//     var credential = result.credential;
//     var token = credential.accessToken;
//     var user = result.user;
//     if(user!==null){
//       window.location.href ="sys.html";
//     }
//   }).catch((error) => {

//     var errorCode = error.code;
//     var errorMessage = error.message;
//     var email = error.email;
//     var credential = error.credential;
//     window.alert("Erro encontrado:"+error)
//   });
//     e.preventDefault();
// })