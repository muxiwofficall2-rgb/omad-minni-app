let lang="uz";

const data={
uz:{
main:[
["📄 Viza javobi","visa"],
["📝 Anketa","anketa"],
["💬 Telegram","https://t.me/AVIAKASSA9094"],
["🎫 Aviabilet","https://t.me/+uJn1nFmpzjoxMGEy"]
]
},
ru:{
main:[
["📄 Ответ по визе","visa"],
["📝 Анкета","anketa"],
["💬 Telegram","https://t.me/AVIAKASSA9094"],
["🎫 Билеты","https://t.me/+uJn1nFmpzjoxMGEy"]
]
}
};

const main=document.getElementById("main");

function render(){
main.innerHTML="";
data[lang].main.forEach(i=>{
let div=document.createElement("div");
div.className="btn blue";
div.innerText=i[0];

div.onclick=()=>{
if(i[1]=="visa") openVisa();
else if(i[1]=="anketa") openAnketa();
else window.open(i[1]);
};

main.appendChild(div);
});
}

function setLang(l){
lang=l;
render();
}

function openVisa(){
document.getElementById("main").style.display="none";
document.getElementById("visa").classList.remove("hidden");
}

function openAnketa(){
document.getElementById("main").style.display="none";
document.getElementById("anketa").classList.remove("hidden");
}

function back(){
document.getElementById("main").style.display="grid";
document.getElementById("visa").classList.add("hidden");
document.getElementById("anketa").classList.add("hidden");
}

function call(num){
window.location.href="tel:"+num;
}

function openVisa(){
window.open("https://visa.mfa.uz/ruxsat/view","_blank");
}

render();
