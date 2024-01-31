function improveText() {
    var range = quill.getSelection();
    if (range && range.length > 0) {
        var text = quill.getText(range.index, range.length);

        // Make an API request to OpenAI for text corrections
        requestTextCorrection(text, function(correctedText) {
            quill.deleteText(range.index, range.length);
            quill.insertText(range.index, correctedText);
        });
    }
}

function requestTextCorrection(text, callback) {

    // Get the status message
    var statusMessage = document.getElementById('statusMessage');

    // Set message content to processing
    statusMessage.style.display = 'block';
    statusMessage.textContent = 'Processing...';

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "api.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

    // Hide the status message by default
        statusMessage.style.display = 'none';

        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            if (response.choices?.length > 0) {
                const messageContent = JSON.parse(response.choices[0].message.content);

                statusMessage.textContent = messageContent.improved_text ? messageContent.openai_comment : 'No improvement needed.';
                if (messageContent.improved_text) {
                    callback(messageContent.improved_text);
                }
            } else {
                statusMessage.textContent = 'Error: Invalid response format.';
            }
        } else {
            console.error("API request failed with status: " + xhr.status);
            statusMessage.textContent = 'Error processing the request.';
        }

    // Display the status message if there's any text set
        if (statusMessage.textContent) {
            statusMessage.style.display = 'block';
        }
    };

    var selectedLanguage = document.getElementById('languageSelector').value;
    var selectedStyle = document.getElementById('styleSelector').value;
    console.log(selectedStyle);
    var data = {
        text: text,
        language: selectedLanguage,
        style: selectedStyle
    };

    xhr.send(JSON.stringify(data));
}