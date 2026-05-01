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

// 🔥 TIL ALMASHTIRISH
function setLang(lang){

  if(lang === "ru"){
    document.getElementById("btn1").innerText = "✈️ Бронирование авиабилета";
    document.getElementById("btn2").innerText = "🛂 Ответы по визе";
    document.getElementById("btn3").innerText = "👥 Телеграм группа";
    document.getElementById("btn4").innerText = "📞 Поддержка";
    document.getElementById("btn5").innerText = "📝 Заполнение анкеты";
    document.getElementById("btn6").innerText = "📄 Наши услуги";
    document.getElementById("subtitle").innerText = "Сервис";
  }

  else{
    document.getElementById("btn1").innerText = "✈️ Aviabilet bron qilish";
    document.getElementById("btn2").innerText = "🛂 Viza javoblari";
    document.getElementById("btn3").innerText = "👥 Telegram guruh";
    document.getElementById("btn4").innerText = "📞 Yordam";
    document.getElementById("btn5").innerText = "📝 Anketa to‘ldirish";
    document.getElementById("btn6").innerText = "📄 Uslugyalarimiz";
    document.getElementById("subtitle").innerText = "Servis";
  }

}
