let lang = "uz";

const t = {
  uz:{
    avia_booking:"Avia bilet bron qilish",
    ticket_price:"Biletlar narxi",
    visa_answers:"Viza javoblari",
    anketa_service:"Anketa to‘ldirish xizmati",
    visa_link:"Viza tekshirish",
    consul_group:"Konsulxona guruhi",
    fill_form:"Anketani to‘ldirish",
    contact:"Murojaat",
    back:"Orqaga"
  },
  ru:{
    avia_booking:"Бронирование авиабилетов",
    ticket_price:"Цены на билеты",
    visa_answers:"Визовые ответы",
    anketa_service:"Заполнение анкеты",
    visa_link:"Проверка визы",
    consul_group:"Консульская группа",
    fill_form:"Заполнить анкету",
    contact:"Контакты",
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

/* ✅ FIXED NAVIGATION */
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

window.onload = () => {
  render();
};
