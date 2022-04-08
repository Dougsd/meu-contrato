const SITE_URL="https://efcaz-f8ca9.web.app";
const  GALERIA="https://efcaz-f8ca9.web.app/img/";
const doc3 =  document.querySelector("#register-form");
doc3.addEventListener("submit",(evento)=>{
    //Recolhe dados
    var Nome = document.getElementById("name").value; 
    var Sobrenome = document.getElementById("lastname").value;
    var Email = document.getElementById("email").value;
    var Senha = document.getElementById("password").value;
    var Telefone = document.getElementById("input_telefone").value;
    var Cpf = document.getElementById("input_cpf").value;
    var foto = arquivo2;
    writeUserData(Senha,Nome, Sobrenome,Email, Telefone,Cpf,foto)
    //Cria conta no firebase
    // auth.createUserWithEmailAndPassword(Email, Senha)
    // .then(() => {
    //     var user = auth.currentUser;
    //     if(user!=null){
           
    //         if(user.emailVerified != false){
    //             window.location.href = ("sys.html");
    //         }else{
                
    //             window.alert("Verifique seu email, click no link enviado por e-mail");
    //             auth.currentUser.sendEmailVerification()
    //             .then(() => {
    //                 window.location.href = (SITE_URL+"/index.html");
    //                 // Email verification sent!
    //                 // ...
    //              });
    //         }
    //     }
    // }).catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     window.alert("ERRO DE CÓDIGO:"+errorCode+"ERRO DE MENSAGEM:"+errorMessage);
    // });
    
    //Encerra o evento assim que ler todas as intruções
    evento.preventDefault();
})