
function openPage(id){
  document.getElementById("main").classList.add("hidden");

  let page = document.getElementById(id);
  page.classList.remove("hidden");
  page.classList.add("show");
}

