const socket = io();

// Function to prompt user for their name and add it to the user list
do {
  var username = prompt("Please enter your name:");
} while (!username);
if (username.trim() !== "") {
  socket.emit("setUsername", username); // Emit username to server
  document.getElementById("userList").innerHTML += "<p>" + username + "</p>";
}
// Event listener for receiving updated user list from server
socket.on("userList", function (users) {
  var userListHTML = "";
  for (var i = 0; i < users.length; i++) {
    userListHTML += "<p>" + users[i] + "</p>";
  }
  document.getElementById("userList").innerHTML = userListHTML;
});

// Function to handle code changes and emit to server
document.getElementById("code").addEventListener("input", function () {
  emitCodeChange(this.value);
});

// Event listener for code changes received from server
socket.on("codeChange", (data) => {
  // Handle code change
  console.log("Code change received:", data);
  updateCodeEditor(data); // Update code editor with received changes
});

// Function to emit code changes
function emitCodeChange(data) {
  socket.emit("codeChange", data);
}

// Function to update code editor with received changes
function updateCodeEditor(newCode) {
  // Update the value of the code textarea
  document.getElementById("code").value = newCode;
}

// Event listener for receiving chat messages from server
socket.on("chatMessage", function (message) {
  var chatMessages = document.getElementById("chatMessages");
  chatMessages.innerHTML +=
    "<p><strong>" + message.user + ":</strong> " + message.text + "</p>";
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
});

// Send chat message to server
document
  .getElementById("sendChatButton")
  .addEventListener("click", function () {
    var chatInput = document.getElementById("chatInput");
    var message = chatInput.value.trim();
    if (message !== "") {
      socket.emit("chatMessage", { user: username, text: message });
      chatInput.value = ""; // Clear input
    }
  });

// Send chat message when pressing Enter key
document.getElementById("chatInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("sendChatButton").click();
  }
});
