// MAIN BUTTONS
const main=document.getElementById("main");

main.innerHTML=`
<div class="btn blue" onclick="visa()">📄 Viza javobi</div>
<div class="btn green" onclick="anketa()">📝 Anketa</div>
<div class="btn red" onclick="window.open('https://t.me/AVIAKASSA9094')">💬 Telegram</div>
<div class="btn" onclick="window.open('https://t.me/+uJn1nFmpzjoxMGEy')">🎫 Aviabilet</div>
`;

// VISA PAGE
function visa(){
document.getElementById("main").style.display="none";
document.getElementById("visa").classList.remove("hidden");
document.getElementById("anketa").classList.add("hidden");
}

// ANKETA PAGE
function anketa(){
document.getElementById("main").style.display="none";
document.getElementById("anketa").classList.remove("hidden");
document.getElementById("visa").classList.add("hidden");
}

// BACK
function back(){
document.getElementById("main").style.display="grid";
document.getElementById("visa").classList.add("hidden");
document.getElementById("anketa").classList.add("hidden");
}

// VISA LINK
function openVisaLink(){
window.open("https://visa.mfa.uz/ruxsat/view","_blank");
}

// CALL
function call(num){
window.location.href="tel:"+num;
}
