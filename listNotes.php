<?php
$notesDir = "notes/";
$files = scandir($notesDir);
$notes = array();

foreach ($files as $file) {
    if (is_file($notesDir . $file)) {
        $notes[] = $file;
    }
}

echo json_encode($notes);
?>
