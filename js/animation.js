function changeCharacter(character) {

  const image = document.getElementById("characterImage");
  const name = document.getElementById("characterName");
  const desc = document.getElementById("characterDesc");

  if(character === "rikka"){
    image.src = "transparent w border.png";
    name.textContent = "Rikka";
    desc.textContent = "A quiet girl haunted by fragments of the past.";
  }

}