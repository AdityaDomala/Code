$(document).ready(function() {
    loadDocumentIDs();
    $('#show-documents').on('click', displaySelectedDocuments);
});

function loadDocumentIDs() {
    const agencies = {
        'CIA': 43,
        'DIA': 3,
        'FBI': 41,
        'NSA': 22,
        'USCBP': 2
    };

    Object.keys(agencies).forEach(agency => {
        for (let i = 1; i <= agencies[agency]; i++) {
            let docId = `${agency}_${i.toString().padStart(2, '0')}`;
            addDocumentToList(docId);
        }
    });
}

function addDocumentToList(id) {
    const listItem = $('<li>', {
        id: `doc-${id}`,
        text: id,
        class: 'doc-item',
        click: function() { toggleDocumentSelection(id, $(this)); }
    }).appendTo('#document-list');
}

function toggleDocumentSelection(documentId, listItem) {
    listItem.toggleClass('selected');
    if (listItem.hasClass('selected')) {
        localStorage.setItem(documentId, ''); // Placeholder for content to be fetched
    } else {
        localStorage.removeItem(documentId); // Remove if unselected
    }
}

function displaySelectedDocuments() {
    const workspace = $('#workspace');
    workspace.empty(); // Clear previous content
    $('.doc-item.selected').each(function() {
        const documentId = $(this).text();
        displayDynamicDocument(documentId);
    });
}

async function displayDynamicDocument(documentId) {
    const content = localStorage.getItem(documentId);
    if (content) {
        displayDocumentContent(documentId, content);
    } else {
        const url = `http://localhost:3000/dataset/${documentId}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            localStorage.setItem(documentId, data); // Save fetched content to localStorage
            displayDocumentContent(documentId, data);
        } catch (error) {
            displayDocumentContent(documentId, 'Failed to load document.');
        }
    }
}

$(document).ready(function() {
    // Initialize sortable functionality on the list
    $("#draggable-list").sortable({
      placeholder: "ui-state-highlight" // Optional: Adds a style to the placeholder
    });
    $("#draggable-list").disableSelection(); // Optional: Prevents text selection during sorting
  });

function displayDocumentContent(documentId, content) {
    const contentDiv = $('<div>').html(`<h3>${documentId}</h3><p>${content}</p>`);
    $('#workspace').append(contentDiv);
    
}















// function setupDragAndDrop() {
//     // Enable drag for document items
//     $(document).on('dragstart', '.doc-item', function(e) {
//         e.originalEvent.dataTransfer.setData('text/plain', this.id);
//     });

//     // Define the workspace as a drop zone
//     $('#workspace').on('dragover', function(e) {
//         e.preventDefault(); // This is necessary to allow a drop
//         $(this).addClass('dragover'); // Optional: Add a class to indicate a drag is over the drop zone
//     }).on('dragleave', function(e) {
//         $(this).removeClass('dragover'); // Optional: Remove the class indicating drag over
//     }).on('drop', function(e) {
//         e.preventDefault();
//         $(this).removeClass('dragover');
//         const id = e.originalEvent.dataTransfer.getData('text/plain');
//         const element = $('#' + id);
//         displayDynamicDocument(id.replace('doc-', ''), true); // Pass true to indicate it's a drag and drop
//     });
// }

// function displayDynamicDocument(documentId, isDragDrop = false) {
//     const content = localStorage.getItem(documentId);
//     if (content && !isDragDrop) {
//         displayDocumentContent(documentId, content);
//     } else {
//         const url = `http://localhost:3000/dataset/${documentId}`;
//         fetch(url)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.text();
//             })
//             .then(data => {
//                 localStorage.setItem(documentId, data);
//                 displayDocumentContent(documentId, data);
//             })
//             .catch(error => {
//                 displayDocumentContent(documentId, 'Failed to load document.');
//                 console.error('Error fetching document:', error);
//             });
//     }
// }

// // ... rest of the existing code ...

// // Call setupDragAndDrop to initialize drag-and-drop functionality
// setupDragAndDrop();
