


var cert = {
   data:'',
   password:'',
}

var getfile = document.querySelector('#cert')
getfile.addEventListener('change', function(e) {
   var file  = document.querySelector('input[type=file]').files[0]
   var reader2= new FileReader()
      reader2.onload = function(evt){
         
            cert.data = evt.target.result
            var aux=evt.target.result
         //   console.log('\n',aux.toString(),'\n')
      }
      // reader2.readAsText(file)
      reader2.readAsDataURL(file)
      
      // console.log('cert=',cert)


   e.preventDefault()
})

var assinar = document.querySelector('#ass')
assinar.addEventListener('click', function(e) {
   
   var pass = document.querySelector('#pass').value
   cert.password=pass
   
   var link = new URL(window.location.href)
   const token= new URLSearchParams(link.search).get('token')
   //OK
   var req = new XMLHttpRequest()

   req.overrideMimeType("application/json")
   req.open('POST', '/sign'+'?token='+token, true)
   
   req.onload  = function() {
      var jsonResponse = req.response
      js=JSON.parse(jsonResponse) 
      
      let pdfWindow = window.open(js.data)
      pdfWindow.document.write("<iframe width='100%' height='100%' src="+js.data+ "></iframe>")
      // pdfWindow.location.href = js.data
      // window.open(js.data )
      
      // window.open(jsonResponse.data)
      // window.location.href=jsonResponse.url
   }
   // console.log('cert=', JSON.stringify(cert))
   // // console.log(aux)
   req.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
   req.send(JSON.stringify(cert))
   e.preventDefault()
 })