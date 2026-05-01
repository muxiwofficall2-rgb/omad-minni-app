let lang = "uz";
let data = {};

fetch("lang.json")
  .then(r => r.json())
  .then(j => {
    data = j;
    render();
  });

function setLang(l){
  lang = l;
  render();
}

function render(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(data[lang][key]){
      el.innerText = data[lang][key];
    }
  });
}

function openPage(id){
  document.getElementById("home").classList.add("hidden");
  document.getElementById(id).classList.remove("hidden");
}

function back(){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  document.getElementById("home").classList.remove("hidden");
}
