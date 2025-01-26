const scalarRow = document.getElementById("scalarRow");
const increaseButton = document.getElementById("increaseButton");
const decreaseButton = document.getElementById("decreaseButton");

// Scalar data with icons
const scalars = [
    { icon: "⌚", color: "#808080" }, // Time (gray)
    { icon: "📩", color: "#4dff88" }, // Report (green)
    { icon: "🍎", color: "#ff4d4d" }, // Hunger (red)
    { icon: "💧", color: "#4db8ff" }, // Thirst (blue)
    { icon: "⚡", color: "#ffdb4d" }, // Stamina (yellow)
];

// Initialize scalars
scalars.forEach((scalar) => {
    // Create the scalar group
    const group = document.createElement("div");
    group.classList.add("scalar-group");

    // Create the icon circle
    const iconCircle = document.createElement("div");
    iconCircle.classList.add("icon-circle");
    iconCircle.textContent = scalar.icon;
    iconCircle.style.borderColor = scalar.color; // Outline color
    iconCircle.style.backgroundColor = scalar.color; // Fill color

    // Create the scalar bar
    const scalarBar = document.createElement("div");
    scalarBar.classList.add("scalar");

    const fillBar = document.createElement("div");
    fillBar.classList.add("fill");
    fillBar.style.backgroundColor = scalar.color; // Fill color
    scalarBar.appendChild(fillBar);

    // Append elements
    group.appendChild(iconCircle);
    group.appendChild(scalarBar);
    scalarRow.appendChild(group);
});

            // Handle button clicks to increase/decrease fill
            const scalarsFill = document.querySelectorAll(".scalar .fill");

            increaseButton.addEventListener("click", () => {
                scalarsFill.forEach((fill) => {
                const currentWidth = parseFloat(fill.style.width);
                if (currentWidth < 100) {
                    fill.style.width = `${currentWidth + 10}%`; // Increase fill by 10%
                }
                });
            });

            decreaseButton.addEventListener("click", () => {
                scalarsFill.forEach((fill) => {
                const currentWidth = parseFloat(fill.style.width);
                if (currentWidth > 0) {
                    fill.style.width = `${currentWidth - 10}%`; // Decrease fill by 10%
                }
                });
            });