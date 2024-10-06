document.addEventListener("DOMContentLoaded", () => {
  const pixelCanvas = document.getElementById("pixelCanvas");
  const colorPicker = document.getElementById("colorPicker");
  const colorValue = document.getElementById("colorValue");
  const gridSizeSelect = document.getElementById("gridSize");
  const createGridButton = document.getElementById("createGrid");
  const saveImageButton = document.getElementById("saveImage");

  let gridSize = parseInt(gridSizeSelect.value); // Get initial value from select
  let currentColor = colorPicker.value;

  // Create Grid Function
  function createGrid(size) {
    pixelCanvas.innerHTML = ""; // Clear existing grid
    pixelCanvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    pixelCanvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      pixel.addEventListener("click", () => {
        pixel.style.backgroundColor = currentColor;
      });
      pixelCanvas.appendChild(pixel);
    }
  }

  // Handle grid creation
  createGridButton.addEventListener("click", () => {
    gridSize = parseInt(gridSizeSelect.value); // Get the selected grid size
    createGrid(gridSize);
  });

  // Update color when color picker changes
  colorPicker.addEventListener("change", (e) => {
    currentColor = e.target.value;
    colorValue.innerText = currentColor;
  });

  // Save pixel art as image
  saveImageButton.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const pixels = document.querySelectorAll(".pixel");

    const pixelSize = 20; // Each pixel in the canvas

    canvas.width = gridSize * pixelSize;
    canvas.height = gridSize * pixelSize;

    // Draw the grid on the canvas
    pixels.forEach((pixel, index) => {
      const x = (index % gridSize) * pixelSize;
      const y = Math.floor(index / gridSize) * pixelSize;
      ctx.fillStyle = window.getComputedStyle(pixel).backgroundColor;
      ctx.fillRect(x, y, pixelSize, pixelSize);
    });

    // Download the canvas as an image
    const link = document.createElement("a");
    link.download = "pixel_art.png";
    link.href = canvas.toDataURL();
    link.click();
  });

  // Initialize with default grid size
  createGrid(gridSize);
});

// Theme switcher
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
