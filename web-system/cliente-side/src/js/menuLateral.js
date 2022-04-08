//Envio de solicitacoes de assinatura 
    var documento = {//SAD (SOLICITACAO DE ASSINATURA DE DOCUMENTOS)
        name:'',
        responsavel:[],//Quem solicitou assinatura
        assinantes:[],
        data:'',//object blob 
        assinaturas:[],
        date:'',
        type:'',
        publicIp:null,
        id:'',
        signatures:[{}],
        
    }
    documento.signatures.push({
        reason: '',
        email: '',
        location:'',
        signerName: '',
        annotationAppearanceOptions: {
            signatureCoordinates: { left: 50, bottom: 600, right: 190, top: 760 },
            signatureDetails: [

                {
                    value: '',
                    fontSize: 7,
                    transformOptions: { rotate: 0, space: 1, tilt: 0, xPos: 20, yPos: 20 },
                }
                ,
                {
                    value: '',
                    fontSize: 7,
                    transformOptions: { rotate: 0, space: 1, tilt: 0, xPos: 20, yPos: 30 },
                }
                
                ,
                {
                    value: '',
                    fontSize: 7,
                    transformOptions: { rotate: 0, space: 1, tilt: 0, xPos: 20, yPos: 20 },
                },
                {
                    value: '',
                    fontSize: 7,
                    transformOptions: { rotate: 0, space: 1, tilt: 0, xPos: 20, yPos: 30 },
                }
                ,
    ,
            ],
        }
    }
    )
    const sad = documento
    now = new Date
    var date = now.getDate()+'/'+(now.getMonth()+1)+'/'+now.getFullYear()+' às '+now.getHours()+':'+now.getMinutes()
    documento.date=date
    // console.log(documento.toString())
    var obj = Object.create(Object.prototype)
    Object.defineProperty(obj,'',documento)
    var btn_enviar = document.getElementById('btn-enviar')
    btn_enviar.addEventListener('click',(e)=>{
        var lista = document.querySelectorAll('.pessoa');
        for(var i=0; i<lista.length;i++){
            var aux = lista[i];
            var temp = aux.querySelectorAll('p');
            // console.log(temp[2].textContent)
            var pessoa  = {
                nome:temp[0].textContent,//nome
                papel:temp[1].textContent,//tipo de assinante, papel
                email:temp[2].textContent//email
            }
            documento.assinantes.push(pessoa);
        }
        // console.log('lista',documento.data)
        // console.log(JSON.stringify(documento))
        var link = new URL(window.location.href)
        const token= new URLSearchParams(link.search).get('token')
        var req = new XMLHttpRequest()
        
        req.overrideMimeType("application/json")
        req.open('POST', '/home/sad/'+'?token='+token, true)
        
        req.onload  = function() {
           var jsonResponse =req.response
           console.log(jsonResponse)
           window.location.href=jsonResponse
        }
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        req.send(JSON.stringify(documento))
        documento=sad
        // var xhr = new XMLHttpRequest();
        // // xhr.open('GET', 'http://localhost:5000/login', true);
        // xhr.open('POST', '/home/sad', true);
        // xhr.onload = function () {

        // // Requisição finalizada. Faça o processamento aqui.
        // }
        // xhr.send(JSON.stringify(documento))
        // console.log(JSON.stringify(documento))
        // writeDocumento(documento);// save in database
        e.preventDefault(documento);
})

//Verificar se possui documento com foto cadastrado.
//Menu item 1
var modelo = document.getElementById('modelos')
modelo.addEventListener('click',(e)=>{
    e.preventDefault()
    var painel2 = document.getElementById('painel2')
    painel2.style.display='none'
    var painel1 = document.getElementById('painel1')
    painel1.style.display='flex'
})
//Menu item 2
var painel2 = document.getElementById('painel2')
painel2.style.display='none'
var assinar = document.getElementById('assinar')
assinar.addEventListener('click',(e)=>{
    e.preventDefault();
    var painel1 = document.getElementById('painel1')
    painel1.style.display='none'
    var painel2 = document.getElementById('painel2')
    painel2.style.display='block'
   
  
})


//Item Assinatura
var add = document.getElementById('btn-add')
add.addEventListener('click',(e)=>{
    var participations = document.getElementById('participations')
    var pessoa_invite = document.createElement('div')
    pessoa_invite.setAttribute('class','pessoa_invite')
    var preID = Math.floor(Math.random() * 10)
    pessoa_invite.setAttribute('id','pessoa_invite'+preID)

    var pessoa = document.createElement('div')
    pessoa.setAttribute('class','pessoa')

    var p1 = document.createElement('p')
    p1.innerText= document.getElementById('input_name1').value
    var p2 = document.createElement('p')
    p2.innerText= document.getElementById('input_mail1').value
    var p3 = document.createElement('p')
    if(document.getElementById('testemunha').checked) {
        p3.innerText='Testemunha'
      }else if(document.getElementById('contratado').checked) {
        p3.innerText='Contratado'
      }else{
        p3.innerText='Contratante'
    }
    
    var close = document.createElement('div')
    close.setAttribute('class','close')
    var img = document.createElement('img')
    img.setAttribute('src','./img/close.png')
    // img.setAttribute('id','img'+preID);
    img.addEventListener('click',(e)=>{
        pessoa_invite.remove()
        e.preventDefault()
    })
    close.appendChild(img)
    pessoa.appendChild(p1)
    pessoa.appendChild(p3)
    pessoa.appendChild(p2)
    pessoa_invite.appendChild(pessoa)
    pessoa_invite.appendChild(close)
    participations.appendChild(pessoa_invite)
    e.preventDefault()
    participations.appendChild(pessoa_invite)
})


//item 
var arquivo = document.getElementById('doc')
arquivo.addEventListener('change',(e)=>{// Evento disparado apos selecionar um arquivo
    e.preventDefault();
    var file  = document.querySelector('input[type=file]').files[0]
    document.querySelector('#file_name').innerHTML=file.name
    var reader= new FileReader()
    reader.onload = function(evt) {
        var data = evt.target.result
        
        documento.name = file.name
        documento.type = 'Contrato'
        documento.data = data
    }
    // console.log(file.size)
    reader.readAsDataURL(file)
    // var reader2= new FileReader()
    // reader2.onload = function(evt){
    //     console.log(evt.target.result)
        
    // }
    // reader2.readAsText(file)
    // const form = new FormData()
    // form.append('avatar',file[0])
    // console.log(form)
    // cert.data = form
    // documento.data = form
    // reader2.readAsArrayBuffer(file)
    
})


