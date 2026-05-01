let lang="uz";

const t={
uz:{
visa:"Viza",
anketa:"Anketa",
contact:"Murojaat uchun",
back:"Orqaga",
visa_check:"Vizani tekshirish",
group:"Konsul guruhi",
passport:"Zagran pasport",
return:"Vatanga Qaytish",
transit:"Tranzit viza"
},
ru:{
visa:"Виза",
anketa:"Анкета",
contact:"Для связи",
back:"Назад",
visa_check:"Проверить визу",
group:"Консульская группа",
passport:"Паспорт",
return:"Возвращения на Родину",
transit:"Транзитная виза"
}
};

function setLang(l){
lang=l;
document.querySelectorAll("[data-lang]").forEach(el=>{
el.innerText=t[lang][el.dataset.lang];
});
}

function openPage(id){
document.getElementById("main").classList.add("hidden");
document.getElementById(id).classList.remove("hidden");
}

function back(){
document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
document.getElementById("main").classList.remove("hidden");
}

setLang("uz");
