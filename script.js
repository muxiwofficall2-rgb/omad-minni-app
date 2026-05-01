function openPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function goHome(){
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
  document.getElementById('home').classList.remove('hidden');
}

function tg(user){
  window.open("https://t.me/" + user.replace("@",""));
}

function setLang(lang){
  if(lang === 'ru'){
    document.getElementById('subtitle').innerText = "Сервис";
  }else{
    document.getElementById('subtitle').innerText = "Servis";
  }
}
