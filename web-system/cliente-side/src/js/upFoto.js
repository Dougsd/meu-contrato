var arquivo2;                                                                                                 
function getFile() {
      input = document.getElementById('label_img');
      file    = document.querySelector('#input_file').files[0];
      reader = new FileReader();
    
    reader.onloadend = function () {
      input.src = reader.result;
      arquivo2 = reader.result;
    }
    if (file) {
      reader.readAsDataURL(file);
    }else {
      input.src = "";
    }   
}