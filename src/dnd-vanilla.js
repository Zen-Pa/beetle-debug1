const items = document.querySelectorAll('.item');
const sockets = document.querySelectorAll('.n-container-socket');
const dropSound = new Audio('/assets/notification-sound-269266.mp3'); 


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
        dropSound.play(); // Play the drop sound--------------------------------------------------------------
      }
    } else if (source === 'n-container-socket') {
      // Move the item between sockets
      const draggedItem = document.getElementById(itemId);
      if (draggedItem) {
        socket.appendChild(draggedItem);
        dropSound.play(); // Play the drop sound--------------------------------------------------------------
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


// const sockets = document.querySelectorAll('.n-container-socket');

sockets.forEach((socket) => {
  // Handle dragover to allow dropping and set border dynamically
  socket.addEventListener('dragover', (e) => {
    e.preventDefault();

    const maxItems = parseInt(socket.getAttribute('data-max-items'), 10);
    const currentItems = socket.querySelectorAll('.item').length;
    const draggedItemId = e.dataTransfer.getData('text/plain');
    const draggedOriginalId = draggedItemId.replace(/-copy-\d+$/, '');

    // Check if the socket is full or has a duplicate
    const isFull = currentItems >= maxItems;
    const hasDuplicate = Array.from(socket.querySelectorAll('.item')).some(
      (item) => item.id.startsWith(draggedOriginalId)
    );

    if (isFull || hasDuplicate) {
      socket.classList.add('border-red');
      socket.classList.remove('border-green', 'border-none');
    } else {
      socket.classList.add('border-green');
      socket.classList.remove('border-red', 'border-none');
    }
  });

  // Handle dragenter (when an item enters the socket)
  socket.addEventListener('dragenter', (e) => {
    e.preventDefault();
    socket.classList.add('border-none'); // Initially, no border until logic in dragover sets it
  });

  // Handle dragleave (when the item leaves the socket area)
  socket.addEventListener('dragleave', (e) => {
    socket.classList.remove('border-green', 'border-red');
    socket.classList.add('border-none'); // Reset border to none
  });

  // Handle drop (to finalize the drop and reset borders)
  socket.addEventListener('drop', (e) => {
    e.preventDefault();
    socket.classList.remove('border-green', 'border-red', 'border-none'); // Reset border on drop
    dropSound.play(); // Play the drop sound--------------------------------------------------------------
  });
});

// Reset all borders when dragging ends
document.addEventListener('dragend', () => {
  sockets.forEach((socket) => {
    socket.classList.remove('border-green', 'border-red');
    socket.classList.add('border-none');
    
  });
});






// Create an audio object for the drop sound

// Add drop event listener to all sockets
// sockets.forEach((socket) => {
//   socket.addEventListener('drop', (e) => {
//     e.preventDefault();

//     const maxItems = parseInt(socket.getAttribute('data-max-items'), 10);
//     const currentItems = socket.querySelectorAll('.item').length;

//     const itemId = e.dataTransfer.getData('text/plain');
//     const draggedItem = document.getElementById(itemId);

//     if (currentItems < maxItems && draggedItem) {
//       // Successful drop logic (e.g., append item to the socket)
//       socket.appendChild(draggedItem);

//       // Play the drop sound
//       dropSound.play();
//     } else {
//       alert('Socket is full or drop is invalid.');
//     }
//   });
// });