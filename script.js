let lang="uz";
const t={
uz:{
visa:"Viza",
anketa:"Anketa",
contact:"Murojaat",
map:"Manzil",
back:"Orqaga",
visa_check:"Vizani tekshirish",
group:"Konsul guruhi",
passport:"Zagran pasport",
return:"Qaytish",
transit:"Tranzit viza"
},
ru:{
visa:"Виза",
anketa:"Анкета",
contact:"Связь",
map:"Адрес",
back:"Назад",
visa_check:"Проверить визу",
group:"Консульская группа",
passport:"Паспорт",
return:"Возврат",
transit:"Транзит"
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
