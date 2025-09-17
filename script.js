let images = [];
let remaining = [];

const imgElement = document.getElementById("pasta-image");
const numberElement = document.getElementById("pasta-number");
const btn = document.getElementById("draw-btn");
const remainingText = document.getElementById("remaining");

function updateRemaining() {
  remainingText.textContent = `Quedan ${remaining.length} pastas por salir`;
}

btn.addEventListener("click", () => {
  if (remaining.length === 0) {
    imgElement.src = "";
    numberElement.textContent = "FIN 🎉";
    remainingText.textContent = "¡El bingo terminó!";
    btn.disabled = true;
    btn.textContent = "Fin del juego";
    return;
  }

  const randomIndex = Math.floor(Math.random() * remaining.length);
  const selected = remaining.splice(randomIndex, 1)[0];

  imgElement.src = selected.file;
  numberElement.textContent = `#${selected.id}`;
  updateRemaining();
});

// cargar lista desde images.json
fetch("images.json")
  .then(response => response.json())
  .then(data => {
    images = data;
    remaining = [...images];
    updateRemaining();
  });
