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

  btn.disabled = true; // bloquear durante el sorteo
  numberElement.textContent = "🎲 Sorteando...";
  let cycles = 0;
  const maxCycles = 15; // cantidad de cambios antes de detenerse

  const interval = setInterval(() => {
    // mostrar imagenes aleatorias (pueden repetirse)
    const randomFake = images[Math.floor(Math.random() * images.length)];
    imgElement.src = randomFake.file;
    numberElement.textContent = `#${randomFake.id}`;

    cycles++;
    if (cycles > maxCycles) {
      clearInterval(interval);

      // elegir la pasta definitiva
      const randomIndex = Math.floor(Math.random() * remaining.length);
      const selected = remaining.splice(randomIndex, 1)[0];

      imgElement.src = selected.file;
      numberElement.textContent = `#${selected.id}`;
      updateRemaining();
      btn.disabled = false; // habilitar botón de nuevo
    }
  }, 120); // velocidad de animación (ms)
});

// cargar lista desde images.json
fetch("images.json")
  .then(response => response.json())
  .then(data => {
    images = data;
    remaining = [...images];
    updateRemaining();
  });
