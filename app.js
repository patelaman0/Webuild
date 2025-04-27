// Get elements
const chatbotBtn = document.getElementById("chatbotBtn");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Initialize conversation state
let userName = "";
let userEmail = "";
let userPhone = "";
let userMessage = "";

// Show/hide chat window
chatbotBtn.addEventListener("click", () => {
  chatWindow.style.display = "block";
  chatbotBtn.style.display = "none";
});

closeChat.addEventListener("click", () => {
  chatWindow.style.display = "none";
  chatbotBtn.style.display = "block";
});

// Handle sending user input
sendBtn.addEventListener("click", () => {
  const message = userInput.value.trim();

  if (!message) return;

  // Display user message in chat
  chatBody.innerHTML += `<div class="chat-message user-message">${message}</div>`;
  chatBody.scrollTop = chatBody.scrollHeight;

  userInput.value = ""; // Clear input

  // Handle chatbot responses based on the current stage
  if (!userName) {
    userName = message;
    chatBody.innerHTML += `<div class="chat-message bot-message">Nice to meet you, ${userName}! What’s your email address?</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  } else if (!userEmail) {
    userEmail = message;
    chatBody.innerHTML += `<div class="chat-message bot-message">Got it! What's your contact number?</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  } else if (!userPhone) {
    // Validate if the phone number is in a valid format (simple check)
    const phonePattern = /^[0-9]{10}$/; // Adjust pattern as necessary
    if (!phonePattern.test(message)) {
      chatBody.innerHTML += `<div class="chat-message bot-message">Please enter a valid 10-digit phone number.</div>`;
      chatBody.scrollTop = chatBody.scrollHeight;
    } else {
      userPhone = message;
      chatBody.innerHTML += `<div class="chat-message bot-message">Got it! What's your message?</div>`;
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  } else if (!userMessage) {
    userMessage = message;
    chatBody.innerHTML += `<div class="chat-message bot-message">Thank you, ${userName}! We’ve received your message. Someone from our team will get back to you soon.</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
    setTimeout(() => {
      closeChat.click(); // Close chat after submission
    }, 3000);
  }
});
