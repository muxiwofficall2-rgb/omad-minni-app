// MAIN MENU
const main = document.getElementById("main");

main.innerHTML = `
<div class="btn" onclick="openVisa()">Viza javobi</div>
<div class="btn" onclick="openAnketa()">Anketa tuldirish</div>
<div class="btn" onclick="window.open('https://t.me/AVIAKASSA9094')">Telegram</div>
<div class="btn" onclick="window.open('https://t.me/+uJn1nFmpzjoxMGEy')">Avia bilet</div>
`;

function openVisa(){
document.getElementById("main").style.display="none";
document.getElementById("visa").classList.remove("hidden");
document.getElementById("anketa").classList.add("hidden");
}

function openAnketa(){
document.getElementById("main").style.display="none";
document.getElementById("anketa").classList.remove("hidden");
document.getElementById("visa").classList.add("hidden");
}

function back(){
document.getElementById("main").style.display="grid";
document.getElementById("visa").classList.add("hidden");
document.getElementById("anketa").classList.add("hidden");
}

function openVisaLink(){
window.open("https://visa.mfa.uz/ruxsat/view","_blank");
}

function call(num){
window.location.href="tel:"+num;
}

function tg(){
window.open("https://t.me/AVIAKASSA9094");
}

function max(){
window.open("https://max.ru");
}

function mail(){
window.location.href="mailto:kopitsentr.omad@bk.ru";
}
