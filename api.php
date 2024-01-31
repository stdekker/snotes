<?php
require('config.php');

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] == ALLOWED_DOMAIN) {
        $postData = json_decode(file_get_contents('php://input'), true);
        $text = $postData['text'] ?? '';
        $language = $postData['language'] ?? 'English';
        $style = $postData['style'] ?? 'To do nothing';

        // First we generally instruct OpenAI how to behave.
        $system = "You are an experienced editor. Respond in json format. With key 'improved_text' for the improved or unchanged text and the key 'openai_comment' with a brief summary of what has changed."; 

        // Give the system more specific tasks based on the selected editing style
        if($style == "elaborate") {
            $task = "Describe the given text in more detail. Do not make up new information.";
        }

        if ($style == "shorten") {
            $taks = "Make the given text as short as possible.";
        }

        if ($style == "grammar") {
            $task = "Correct the spelling, grammar and punctuation of the given text. Add paragraph breaks if it improves readability.";
        }

        // Prepare the prompt based on the selected text and language
        $prompt = "Your task is to " . $task ."Translate the original text if needed. Return the original text if there is nothing to be changed. The desired language is:". $language . ".  The text to work on is: " . $text;
 
        $data = [
            'model' => "gpt-3.5-turbo",
            'messages' => [
                ["role" => "system", "content" => $system],
                ["role" => "user", "content" => $prompt]
            ],
            'temperature' => .5 // limit or restrict the predictability of the system - higher leads to more unexpected outcomes.
        ];

         // Initialize cURL session
        $ch = curl_init('https://api.openai.com/v1/chat/completions');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . OPENAI_API_KEY
        ]);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        // Execute the cURL request and capture the response
        $response = curl_exec($ch);
        curl_close($ch);

        // Forward the response back to the client
        echo $response;
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
