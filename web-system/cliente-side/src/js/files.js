
function getfile() {
    var file    = document.querySelector('input[type=file]').files[0];
    console.log(file);
    // (file.name) propriedade Onde fica o nome do arquivo
    // (file.lastModifiedDate) Data de modificacao do arquivo
    var reader  = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
    //   preview.src = reader.result;
        console.log("url="+reader.result)
    }
    if (file) {
        var user = auth.currentUser;
        var mountainsRef = storageRef.child('users/'+user.uid+'/'+'contratos/'+file.name);
        mountainsRef.put(file);
    } else {
        window.alert("Selecione um arquivo valido (.docx)");
    }
  }

  function downloadFile(name){
    var starCountRef = firebase.database().ref('contratos/'+name.slice(0, -5)+'/qtd');
    let b ;
    starCountRef.once('value', (snapshot) => {
      var data= snapshot.val();
      console.log(data)
      b = data+1;
      qtdDownloads(name.slice(0, -5),b);
    });
   


    
    
// Create a reference from a Google Cloud Storage URI
    var starsRef = storageRef.child('modelos/'+name);
    starsRef.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        window.open(url);
        console.log('url='+url)

      }).catch(function(error) {
      
        switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              window.alert("File doesn't exist");
              break;
        
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              window.alert('User does not have permission to access the object');
              break;
        
            case 'storage/canceled':
              // User canceled the upload
              window.alert('User canceled the upload');
              break;
            case 'storage/unknown':
                window.alert('Unknown error occurred, inspect the server response');
              // Unknown error occurred, inspect the server response
              break;
          }
      });
  }