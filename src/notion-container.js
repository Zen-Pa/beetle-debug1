// Array of strings
const strings = [
    "joy", 
    "family", 
    "joyful", 
    "evening of joy", 
    "before the day Mishe", 
    "day of joy dedicated to god", 
    "god-incarnation of Mine", 
    "joyful defender of the family", 
    "hunger", 
    "thread💀", 
    "hungry", 
    "threat", 
    "hungry", 
    "threatening", 
    "famine", 
    "blockade of the mine by gardeners", 
    "defender of the threat"
  ];

// Shuffle the array
const shuffledStrings = strings.sort(() => Math.random() - 0.5);

// Container (unordered list)
const container = document.getElementsByClassName("n-container")[0];

// Iterate over the array and create list items
strings.forEach((str, index) => {
    const listItem = document.createElement("li"); // Create a list item

    // Set attributes
    listItem.className = "item";
    listItem.draggable = true;
    listItem.id = `item-${index + 1}`; // Generate unique ID

    // Set the text content
    listItem.textContent = str;

    // Append the item to the list
    container.appendChild(listItem);
});