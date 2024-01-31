function fetchAndDisplayNotes() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "listNotes.php", true);

    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var notes = JSON.parse(this.responseText);
            var notesList = document.getElementById('notesList');
            notesList.innerHTML = '';

            notes.forEach(function(note) {
                var listItem = document.createElement('li');
                listItem.textContent = note;
                listItem.style.cursor = 'pointer';

                // Add delete icon
                var deleteIcon = document.createElement('span');
                deleteIcon.textContent = ' x';

                // Stop event propagation and handle delete
                deleteIcon.addEventListener('click', function(event) {
                    event.stopPropagation();
                    deleteNote(note);
                });

                listItem.appendChild(deleteIcon);

                // Add click event to load the note and fill the filename
                listItem.addEventListener('click', function() {
                    if (hasUnsavedChanges) {
                        if (confirm("You have unsaved changes. Do you want to discard them and open a new note?")) {
                            loadNoteIntoEditor(note);
                            fillFilenameField(note);
                        }
                    } else {
                        loadNoteIntoEditor(note);
                        fillFilenameField(note);
                    }
                });

                notesList.appendChild(listItem);
            });
        }
    }

    xhr.send();
}

function fillFilenameField(filename) {
    // Assuming the filename includes the extension, remove it
    var filenameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
    document.getElementById('filenameInput').value = filenameWithoutExtension;
}

function loadNoteIntoEditor(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "notes/" + filename, true);

    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            quill.root.innerHTML = this.responseText;
            window.hasUnsavedChanges = false;
        }
    }

    xhr.send();
}

function saveNote() {
    var noteContent = quill.root.innerHTML;
    var filename = document.getElementById('filenameInput').value.trim();

    if (filename === '') {
        alert("Please enter a filename.");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "saveNote.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(this.responseText);
            if (this.status === 200 && response.status === "success") {
                alert("Note saved: " + response.message);
                hasUnsavedChanges = false; // Reset the flag as changes are now saved
                fetchAndDisplayNotes();
            } else {
                alert("Error: " + response.message);
            }
        }
    }

    xhr.send("noteContent=" + encodeURIComponent(noteContent) + "&filename=" + encodeURIComponent(filename));
}

function deleteNote(noteFile) {
    if (!confirm("Are you sure you want to delete this note?")) {
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "deleteNote.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var response = JSON.parse(this.responseText);
            alert(response.message);
            if (response.status === "success") {
                fetchAndDisplayNotes(); // Refresh the notes list
            }
        }
    }
    xhr.send("noteFile=" + encodeURIComponent(noteFile));
}