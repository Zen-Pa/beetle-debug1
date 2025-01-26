// String array
const socketItems = ["Mine", "Miner", "Mineum", "Mishe", "Garden", "Gardener", "Garum", "Garshe"];
// Corresponding data-max-items values
const maxSocketItems = [2, 4, 1, 2, 2, 4, 2, 1];
    // Target container
    const ncs = document.getElementById("ncsList");

    // Generate list items dynamically
  socketItems.forEach((socketItem, index) => {
  const li = document.createElement("li"); // Create <li>

    // Set attributes
    li.className = "n-container-socket";
    li.id = `ncs${index + 1}`;
    li.setAttribute("data-max-items", maxSocketItems[index]);

    // Set the text content to the current item
    li.textContent = socketItem;

    // Append to the container
    ncs.appendChild(li);
  });