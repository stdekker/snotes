<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $noteFile = $_POST['noteFile'] ?? '';

    if (!empty($noteFile) && file_exists("notes/" . $noteFile)) {
        if (unlink("notes/" . $noteFile)) {
            echo json_encode(["status" => "success", "message" => "Note deleted successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error deleting the note."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Note file not found."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
