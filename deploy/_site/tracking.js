import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3pt3fBLum7MqDgxigLijqgpVQvGIFxy4",
  authDomain: "game-site-84791.firebaseapp.com",
  projectId: "game-site-84791",
  storageBucket: "game-site-84791.firebasestorage.app",
  messagingSenderId: "512529430981",
  appId: "1:512529430981:web:a09e38bb2909382b81b3ac"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// stable device id
let sessionId = localStorage.getItem("sessionId");
if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem("sessionId", sessionId);
}

// detect game automatically
const game = location.pathname.split("/")[2] || "home";

function ping() {
  setDoc(doc(db, "livePlayers", sessionId), {
    game,
    lastSeen: Date.now()
  });
}

ping();
setInterval(ping, 5000);