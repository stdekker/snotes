function requestMicrophoneAccess() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            // Microphone is now accessible
            console.log("Microphone access granted.");

            // You might want to use the stream for something here

        })
        .catch(function(err) {
            // Handle the error if the user denies access or if a problem occurs
            console.error("Microphone access denied or error occurred:", err);
        });
}