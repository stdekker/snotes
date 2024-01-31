<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $noteContent = $_POST['noteContent'] ?? '';
    $filename = preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['filename']) ?? 'note'; // Sanitize filename

    if (!empty($noteContent)) {
        $filePath = "notes/" . $filename . ".html";

        if (file_put_contents($filePath, $noteContent)) {
            echo json_encode(["status" => "success", "message" => "Note saved successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error saving the note."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Note is empty."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>