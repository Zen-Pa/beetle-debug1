import dragula from 'dragula';
import 'dragula/dist/dragula.min.css';

// Select containers and slots
const container1 = document.getElementById('container1');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');

// Initialize Dragula
const drake = dragula([container1, slot1, slot2], {
  copy: (el, source) => source === container1, // Copy only when dragging from the container
  accepts: (el, target) => {
    if (target === container1) return false; // Prevent dropping into the original container
    const maxItems = parseInt(target.getAttribute('data-max-items'), 10);
    return target.children.length < maxItems; // Enforce slot max items
  },
  removeOnSpill: false // Prevent accidental deletions
});

// Remove cloned items from slots when dragged back to the container
drake.on('drop', (el, target, source) => {
  if (source !== container1 && target === container1) {
    el.parentNode.removeChild(el); // Remove the item
  }
});

// Log events (optional debugging)
drake.on('drag', (el, source) => {
  console.log(`Dragging ${el.textContent} from ${source.id}`);
});

drake.on('drop', (el, target, source) => {
  if (target) {
    console.log(`Dropped ${el.textContent} into ${target.id}`);
  } else {
    console.log(`${el.textContent} was not dropped into a valid container`);
  }
});
