const items = document.querySelectorAll('.item');
const sockets = document.querySelectorAll('.n-container-socket');

// Allow dragging of items in n-container
items.forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id); // Store the item's ID
    e.dataTransfer.setData('source', 'n-container'); // Identify source container
  });
});

sockets.forEach(socket => {
  // Allow dragover to enable dropping
  socket.addEventListener('dragover', (e) => {
    e.preventDefault();

    const maxItems = parseInt(socket.getAttribute('data-max-items'), 10);
    const currentItems = socket.querySelectorAll('.item').length;

    // Highlight socket if full
    if (currentItems >= maxItems) {
      socket.classList.add('socket-full');
    } else {
      socket.classList.remove('socket-full');
    }
  });

  // Handle the drop event
  socket.addEventListener('drop', (e) => {
    e.preventDefault();

    const maxItems = parseInt(socket.getAttribute('data-max-items'), 10);
    const currentItems = socket.querySelectorAll('.item').length;

    // Prevent drop if socket is full
    if (currentItems >= maxItems) {
      // alert('This socket is full.');
      return;
    }

    const itemId = e.dataTransfer.getData('text/plain'); // Get the dragged item ID
    const source = e.dataTransfer.getData('source'); // Get the source of the dragged item
    const originalItemId = itemId.replace(/-copy-\d+$/, ''); // Extract the original item ID (for duplicates check)

    // Prevent duplicates in the same socket
    const isDuplicate = Array.from(socket.querySelectorAll('.item')).some(
      item => item.id.startsWith(originalItemId)
    );

    if (isDuplicate) {
      // alert('This item already exists in this socket.');
      return;
    }

    if (source === 'n-container') {
      // Create a copy of the item if dragged from n-container
      const originalItem = document.getElementById(itemId);
      if (originalItem) {
        const newItem = originalItem.cloneNode(true);
        newItem.id = `${itemId}-copy-${Date.now()}`; // Assign unique ID to copied item
        newItem.draggable = true; // Make the new item draggable
        addDragListeners(newItem); // Add drag listeners to the new item
        socket.appendChild(newItem); // Add to the socket
      }
    } else if (source === 'n-container-socket') {
      // Move the item between sockets
      const draggedItem = document.getElementById(itemId);
      if (draggedItem) {
        socket.appendChild(draggedItem);
      }
    }
  });
});

// Add dragend listener to delete items dropped outside sockets
document.addEventListener('dragend', (e) => {
  const itemId = e.target.id;
  const draggedItem = document.getElementById(itemId);

  if (!draggedItem) return;

  // Check if the dragged item was dropped inside any socket
  const isDroppedInSocket = Array.from(sockets).some(socket => {
    const rect = socket.getBoundingClientRect();
    return (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    );
  });

  // Delete the item if dropped outside all sockets
  if (!isDroppedInSocket && e.dataTransfer.getData('source') === 'n-container-socket') {
    draggedItem.remove();
    console.log(`Item ${itemId} deleted because it was dropped outside a socket.`);
  }
});

// Add drag listeners to dynamically created items
function addDragListeners(item) {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id); // Store the item's ID
    e.dataTransfer.setData('source', 'n-container-socket'); // Identify source container
  });
}