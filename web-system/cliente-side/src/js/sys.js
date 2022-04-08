var profile_img = document.getElementById('img_perfil')
var profile_name = document.getElementById('profile_name')
var profile_email = document.getElementById('profile_email')
var painel2 = document.getElementById('painel2')
painel2.style.display='none'
var assinar = document.getElementById('assinar')
//get user info
auth.onAuthStateChanged((user) => {
  if (user) {
    profile_img.src=user.photoURL
    profile_name.innerHTML=user.displayName
    profile_email.innerHTML=user.email

  } else {
    
  }
})
//assinar

//