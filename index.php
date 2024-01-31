<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>sNotes</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <link href="style.css?v=2" rel="stylesheet"> 
</head>
<body>
  <div class="container">
     <h1>sNotes</h1>
     <p class="tagline">AI assisted note taking</p>
     
     <div id="noteContent"></div>
     <div id="statusMessage" style="display:none;">Thinking...</div>
     <div id="toolbar">
        <input type="text" id="filenameInput" placeholder="Enter filename">
        <button class="ql-improve">Improve</button>
        <!-- <button class="ql-shorten">Shorten</button>-->
        <button type="button" id="saveButton">Save Note</button>
        <div id="languageOptions">
            <label for="languageSelector">Select Language:</label>
            <select id="languageSelector">
                <option value="Nederlands">Dutch</option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
                <option value="German">German</option>
                <option value="Modern Arabic">Arabic</option>
            </select>
        </div>
        <div id="styleOptions">
            <label for="styleSelector">Select style:</label>
            <select id="styleSelector">
                <option value="grammar">grammar and punctuation</option>
                <option value="shorten">shorten</option>
                <option value="elaborate">elaborate</option>
            </select>
        </div>
    </div>

    <h2>Saved notes</h2>
    <ul id="notesList"></ul>

</div>

<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
<script src="editor-crud.js?v=3"></script>
<script src="editor-permissions.js?v=3"></script>
<script src="editor-assistance.js?v=3"></script>
<script src="editor-setup.js?v=3"></script>

</body>
</html>
