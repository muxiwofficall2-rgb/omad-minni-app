let lang = "uz";

const t = {
  uz:{
    avia:"Avia bilet bron qilish",
    group:"Telegram guruh",
    visa_answers:"Viza javoblari",
    anketa:"Anketa xizmati",
    back:"Orqaga"
  },
  ru:{
    avia:"Бронирование авиабилетов",
    group:"Telegram группа",
    visa_answers:"Визовые ответы",
    anketa:"Анкета сервис",
    back:"Назад"
  }
};

function setLang(l){
  lang = l;
  render();
}

function render(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(t[lang][key]){
      el.innerText = t[lang][key];
    }
  });
}

function openPage(id){
  document.getElementById("home").style.display = "none";
  document.getElementById("visa").style.display = "none";
  document.getElementById("anketa").style.display = "none";

  document.getElementById(id).style.display = "block";
}

function back(){
  document.getElementById("visa").style.display = "none";
  document.getElementById("anketa").style.display = "none";
  document.getElementById("home").style.display = "block";
}

window.onload = render;
