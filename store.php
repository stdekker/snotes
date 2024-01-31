<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $noteContent = $_POST['noteContent'] ?? '';
    $noteContent = trim($noteContent);

    // Sanitize the HTML content
    $noteContent = htmlspecialchars($noteContent, ENT_QUOTES, 'UTF-8');

    if (!empty($noteContent)) {
        $fileName = "writer-content/" . time() . ".html"; // Save as .html to preserve formatting
        file_put_contents($fileName, $noteContent);

        echo "Note saved successfully.";
    } else {
        echo "Note is empty.";
    }
} else {
    echo "Invalid request method.";
}