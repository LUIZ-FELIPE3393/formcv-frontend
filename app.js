var content = document.getElementById('put-here');
var button = document.getElementById('input-click');

button.addEventListener('click', writeTo);

function writeTo() {
  let parag = document.createElement("p");
  parag.innerHTML = "Este é um texto em <strong>negrito</strong>";


  content.append(parag);

}