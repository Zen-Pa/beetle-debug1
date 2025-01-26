const skullRow = document.getElementById("skullRow");
const skullButton = document.getElementById("skullButton");
const skullCount = 10; // Total number of skulls
let unfilledSkulls = 0; // Counter for unfilled skulls

// Initialize the row with filled skulls
for (let i = 0; i < skullCount; i++) {
  const skull = document.createElement("div");
  skull.textContent = "💀"; // Skull emoji
  skull.classList.add("skull"); // Add the skull class for styling
  skullRow.appendChild(skull);
}

// Handle button click
skullButton.addEventListener("click", () => {
  if (unfilledSkulls < skullCount) {
    const skulls = document.querySelectorAll(".skull");
    skulls[unfilledSkulls].classList.add("unfilled"); // Mark skull as unfilled
    unfilledSkulls++;

    // Check if all skulls are unfilled
    if (unfilledSkulls === skullCount) {
      setTimeout(() => {
        alert("Game Over! Survive time: 13d!"); // Show "Game Over" dialog
      }, 200); // Delay for better user experience
    }
  }
});