// Select containers and slots
    const container1 = document.getElementById('container1');
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');

// Initialize Dragula for containers
    dragula([container1, slot1, slot2], {
        isContainer: function (el) {
            return false; // only elements in drake.containers will be taken into account
        },
        moves: function (el, source, handle, sibling) {
            return true; // elements are always draggable by default
        },
        accepts: function (el, target, source, sibling) {
            return true; // elements can be dropped in any of the `containers` by default
        },
        invalid: function (el, handle) {
            return false; // don't prevent any drags from initiating by default
        },
        direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
        copy: false,                       // elements are moved by default, not copied
        copySortSource: false,             // elements in copy-source containers can be reordered
        revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
        removeOnSpill: false,              // spilling will `.remove` the element, if this is true
        mirrorContainer: document.body,    // set the element that gets mirror elements appended
        ignoreInputTextSelection: true,     // allows users to select input text, see details below
        slideFactorX: 0,               // allows users to select the amount of movement on the X axis before it is considered a drag instead of a click
        slideFactorY: 0,               // allows users to select the amount of movement on the Y axis before it is considered a drag instead of a click
    });

// Initialize Dragula for slots
    // dragula([slot1, slot2], {
    //     isContainer: function (el) {
    //         return false; // only elements in drake.containers will be taken into account
    //     },
    //     moves: function (el, source, handle, sibling) {
    //         return true; // elements are always draggable by default
    //     },
    //     accepts: function (el, target, source, sibling) {
    //         return true; // elements can be dropped in any of the `containers` by default
    //     },
    //     invalid: function (el, handle) {
    //         return false; // don't prevent any drags from initiating by default
    //     },
    //     direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
    //     copy: false,                       // elements are moved by default, not copied
    //     copySortSource: false,             // elements in copy-source containers can be reordered
    //     revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
    //     removeOnSpill: true,              // spilling will `.remove` the element, if this is true
    //     mirrorContainer: document.body,    // set the element that gets mirror elements appended
    //     ignoreInputTextSelection: true,     // allows users to select input text, see details below
    //     slideFactorX: 0,               // allows users to select the amount of movement on the X axis before it is considered a drag instead of a click
    //     slideFactorY: 0,               // allows users to select the amount of movement on the Y axis before it is considered a drag instead of a click
    // });