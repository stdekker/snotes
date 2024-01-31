let hasUnsavedChanges = false;

var toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote'],
];

var quill = new Quill('#noteContent', {
    theme: 'snow',
    modules: {
        toolbar: toolbarOptions
    }
});

document.addEventListener('DOMContentLoaded', function() {
    quill.keyboard.addBinding({
        key: 191, // backslash
        shortKey: true
    }, function(range, context) {
        improveText();
    });

    quill.on('text-change', function() {
        hasUnsavedChanges = true;
    });

    document.querySelector('.ql-improve').addEventListener('click', function() {
        improveText();
    });

    document.getElementById('saveButton').addEventListener('click', function() {
        saveNote();
    });

    fetchAndDisplayNotes();
    requestMicrophoneAccess();
});
