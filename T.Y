<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Forex AI Chatbot</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <!-- TradingView Forex Chart -->
    <div class="chart-container">
      <h2>Forex Chart</h2>
      <div id="tradingview"></div>
    </div>

    <!-- AI Chatbot -->
    <div class="chat-container">
      <h2>AI Chatbot</h2>
      <div id="chat-box"></div>
      <input type="text" id="user-input" placeholder="Ask about forex..." />
      <button onclick="sendMessage()">Send</button>
    </div>
  </div>

  <!-- TradingView Widget Script -->
  <script type="text/javascript"
    src="https://s3.tradingview.com/tv.js">
  </script>
  <script src="script.js"></script>
</body>
</html>body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.chart-container, .chat-container {
  flex: 1;
  padding: 20px;
  background: white;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
}

#tradingview {
  height: 500px;
}

#chat-box {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: #fafafa;
}

#user-input {
  width: 70%;
  padding: 10px;
}

button {
  padding: 10px 20px;
  margin-left: 5px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}// Initialize TradingView Widget
new TradingView.widget({
  "width": "100%",
  "height": "100%",
  "symbol": "FX:EURUSD",
  "interval": "60",
  "timezone": "Etc/UTC",
  "theme": "light",
  "style": "1",
  "locale": "en",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "withdateranges": true,
  "hide_side_toolbar": false,
  "allow_symbol_change": true,
  "container_id": "tradingview"
});

// Basic AI Chatbot (Mock Responses)
function sendMessage() {
  let input = document.getElementById("user-input").value;
  if (input.trim() === "") return;

  let chatBox = document.getElementById("chat-box");

  // User message
  let userMessage = document.createElement("div");
  userMessage.textContent = "You: " + input;
  userMessage.style.fontWeight = "bold";
  chatBox.appendChild(userMessage);

  // Mock AI reply
  let aiMessage = document.createElement("div");
  aiMessage.textContent = "AI Bot: I recorded your question about '" + input + "'. Later I can be connected to real AI.";
  aiMessage.style.marginBottom = "10px";
  chatBox.appendChild(aiMessage);

  chatBox.scrollTop = chatBox.scrollHeight;
  document.getElementById("user-input").value = "";
}
