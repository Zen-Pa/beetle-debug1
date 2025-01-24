const items = document.querySelectorAll('.item');
const sockets = document.querySelectorAll('.n-container-socket');
  const approveSound = new Audio('assets/1/PRE-SUCCESS--ui-click-menu-modern-interface-select-small-02-230475.mp3');
  const dropSound = new Audio('assets/1/UIClick_Select Thick 13_RSCPC_USIN.wav');
  const negativeSound = new Audio('assets/1/PRE-DENY--ui-beep-confirmation-228332.mp3');
  const errorSound = new Audio('assets/1/ui-beep-confirmation-228332.mp3');
    function playApproveSound() {
      approveSound.currentTime = 0; // Reset to the start
      approveSound.play();
    }
    function playDropSound() {
      dropSound.currentTime = 0; // Reset to the start
      dropSound.play();
    }
    function playNegativeSound() {
      negativeSound.currentTime = 0; // Reset to the start
      negativeSound.play();
    }
    function playErrorSound() {
      errorSound.currentTime = 0; // Reset to the start
      errorSound.play();
    }

// Allow dragging of items in n-container
items.forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id); // Store the item's ID
    e.dataTransfer.setData('source', 'n-container'); // Identify source container
  });
});

sockets.forEach(socket => {
  // Allow dragover to enable dropping
  // socket.addEventListener('dragover', (e) => {
  //   e.preventDefault();

  //   const maxItems = parseInt(socket.getAttribute('data-max-items'), 10);
  //   const currentItems = socket.querySelectorAll('.item').length;

  //   // Highlight socket if full
  //   if (currentItems >= maxItems) {
  //     socket.classList.add('socket-full');
  //   } else {
  //     socket.classList.remove('socket-full');
  //   }
  // });

  // Handle the drop event
  socket.addEventListener('drop', (e) => {
    e.preventDefault();

    const maxItems = parseInt(socket.getAttribute('data-max-items'), 10);
    const currentItems = socket.querySelectorAll('.item').length;

    // Prevent drop if socket is full
    if (currentItems >= maxItems) {
      playErrorSound(); // --------------------------------------------------------------
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
      playErrorSound(); // --------------------------------------------------------------
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
        playDropSound(); // --------------------------------------------------------------
      }
    } else if (source === 'n-container-socket') {
      // Move the item between sockets
      const draggedItem = document.getElementById(itemId);
      if (draggedItem) {
        socket.appendChild(draggedItem);
        playDropSound(); // --------------------------------------------------------------
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
  // // Handle dragover to allow dropping and set border dynamically
  // socket.addEventListener('dragover', (e) => {
  //   e.preventDefault();

  //   const maxItems = parseInt(socket.getAttribute('data-max-items'), 10);
  //   const currentItems = socket.querySelectorAll('.item').length;
  //   const draggedItemId = e.dataTransfer.getData('text/plain');
  //   const draggedOriginalId = draggedItemId.replace(/-copy-\d+$/, '');

  //   // Check if the socket is full or has a duplicate
  //   const isFull = currentItems >= maxItems;
  //   const hasDuplicate = Array.from(socket.querySelectorAll('.item')).some(
  //     (item) => item.id.startsWith(draggedOriginalId)
  //   );

  //   if (isFull || hasDuplicate) {
  //     socket.classList.add('border-red');
  //     socket.classList.remove('border-green', 'border-none');
  //   } else {
  //     socket.classList.add('border-green');
  //     socket.classList.remove('border-red', 'border-none');
  //   }
  // });

  // // Handle dragenter (when an item enters the socket)
  // socket.addEventListener('dragenter', (e) => {
  //   e.preventDefault();
  //   // socket.classList.add('border-none'); // Initially, no border until logic in dragover sets it

  // // dragenter sounds
  //   const maxItems = parseInt(socket.getAttribute('data-max-items'), 10);
  //   const currentItems = socket.querySelectorAll('.item').length;
  //   const draggedItemId = e.dataTransfer.getData('text/plain');
  //   const draggedOriginalId = draggedItemId.replace(/-copy-\d+$/, '');

  //   // Check if the socket is full or has a duplicate
  //   const isFull = currentItems >= maxItems;
  //   const hasDuplicate = Array.from(socket.querySelectorAll('.item')).some(
  //     (item) => item.id.startsWith(draggedOriginalId)
  //   );

  //   const sameSocket = socket.parentElement.id();

  //   if (isFull || hasDuplicate) {

  //     playNegativeSound(); // --------------------------------------------------------------
  //   } else {
  //     playApproveSound(); // --------------------------------------------------------------
  //   }
  // });







  socket.addEventListener('dragenter', (e) => {
    e.preventDefault();
  
    // Get the parent container of the dragged item
    const draggedItemId = e.dataTransfer.getData('text/plain');
    const draggedItem = document.getElementById(draggedItemId);
                const parentContainer = draggedItem ? draggedItem.parentElement : null;
              
                // Only proceed if the current socket is NOT the parent container
                if (parentContainer === socket) {
                  return; // Do nothing if the dragged item is entering its own container
                }
  
    // Logic to handle dragenter sounds
    const maxItems = parseInt(socket.getAttribute('data-max-items'), 10);
    const currentItems = socket.querySelectorAll('.item').length;
    const draggedOriginalId = draggedItemId.replace(/-copy-\d+$/, '');

  // Handle dragenter to style the socket and check conditions
  socket.addEventListener('dragenter', (e) => {
    e.preventDefault();

    const maxItems = parseInt(socket.getAttribute('data-max-items'), 10);
    const currentItems = socket.querySelectorAll('.item').length;
    const draggedItemId = e.dataTransfer.getData('text/plain');
    const draggedOriginalId = draggedItemId.replace(/-copy-\d+$/, '');

    // Check if the socket is full
    const isFull = currentItems >= maxItems;
    // Check if the socket has a duplicate item
    const hasDuplicate = Array.from(socket.querySelectorAll('.item')).some(
      (item) => item.id.startsWith(draggedOriginalId)
    );

    // Highlight socket as full or not
    if (isFull) {
      socket.classList.add('socket-full');
    } else {
      socket.classList.remove('socket-full');
    }

    // Set the border dynamically based on conditions
    if (isFull || hasDuplicate) {
      socket.classList.add('border-red');
      socket.classList.remove('border-green', 'border-none');
      playNegativeSound(); // Play negative sound if drop is not allowed
    } else {
      socket.classList.add('border-green');
      socket.classList.remove('border-red', 'border-none');
      playApproveSound(); // Play approval sound if drop is allowed
    }
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
    // dropSound.play(); // Play the drop sound--------------------------------------------------------------
    // playErrorSound();
    // playNegativeSound();
  });
});

// Reset all borders when dragging ends
document.addEventListener('dragend', () => {
  sockets.forEach((socket) => {
    socket.classList.remove('border-green', 'border-red');
    socket.classList.add('border-none');
    // playErrorSound(); // --------------------------------------------------------------
    
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