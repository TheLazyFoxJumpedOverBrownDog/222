const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'ift-ai-secret-key-2025';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Database file paths
const USERS_DB = path.join(__dirname, 'users.json');

// Initialize database
if (!fs.existsSync(USERS_DB)) {
  fs.writeFileSync(USERS_DB, JSON.stringify([]));
}

// Helper functions
const readUsers = () => {
  const data = fs.readFileSync(USERS_DB, 'utf8');
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2));
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const users = readUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    // Generate token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Signup successful',
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify token
app.get('/api/verify', authenticateToken, (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    user: { id: user.id, name: user.name, email: user.email }
  });
});

// AI Chatbot endpoint
app.post('/api/chat', authenticateToken, (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // AI responses in Hindi
    const responses = getHindiResponse(message.toLowerCase());

    res.json({ response: responses });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Hindi AI Response Generator
function getHindiResponse(message) {
  // Education related
  if (message.includes('padhai') || message.includes('study') || message.includes('class') || message.includes('ncert')) {
    return '📚 Main aapki padhai mein madad kar sakta hoon! Class 6 se 12 tak ke sabhi subjects - Maths, Science, Biology, Arts, Commerce ke liye notes, sample papers aur practice tests available hain. Aap kaunsi class mein ho aur kis subject mein help chahiye?';
  }
  
  // Career guidance
  if (message.includes('doctor') || message.includes('engineer') || message.includes('career') || message.includes('10th') || message.includes('12th')) {
    return '🎯 Career guidance ke liye main yahan hoon! Agar aapko doctor banna hai to 12th mein Biology lena hoga aur NEET exam clear karna hoga. Engineer banne ke liye JEE exam dena hoga. IAS, Police, Army, Teacher - har career ke liye main step-by-step roadmap de sakta hoon. Aap kaunsa career choose karna chahte ho?';
  }
  
  // Job related
  if (message.includes('job') || message.includes('naukri') || message.includes('ssc') || message.includes('upsc') || message.includes('railway')) {
    return '💼 Government aur Private dono jobs ke liye main aapki help kar sakta hoon! UPSC, SSC, Railway, Defence, Banking - sabhi latest job updates aur application links available hain. Aap kis type ki job dhundh rahe ho?';
  }
  
  // Online earning
  if (message.includes('earning') || message.includes('online') || message.includes('paise') || message.includes('freelance')) {
    return '💰 Online earning ke bahut saare tarike hain! Freelancing, Affiliate Marketing, Content Creation - yeh sab aap ghar baithe kar sakte ho. Main aapko skill development aur earning ke liye complete guide de sakta hoon. Kaunsa skill seekhna chahte ho?';
  }
  
  // Scholarship
  if (message.includes('scholarship') || message.includes('yojana') || message.includes('scheme')) {
    return '🎓 India mein students ke liye bahut saari government scholarships aur yojanas hain! Main aapko eligibility check karke sahi schemes suggest kar sakta hoon. Aap kis class mein ho aur kis category se belong karte ho?';
  }
  
  // Greeting
  if (message.includes('hello') || message.includes('hi') || message.includes('namaste') || message.includes('hey')) {
    return '🙏 Namaste! Main IFT AI hoon - India Future Time AI. Main aapki education se employment tak har step mein madad karunga. Aap mujhse padhai, career guidance, job information, ya online earning ke baare mein kuch bhi pooch sakte ho!';
  }
  
  // Help
  if (message.includes('help') || message.includes('madad') || message.includes('kya kar sakte')) {
    return '🤝 Main aapki madad kar sakta hoon:\n\n📚 Education Support (Class 6-12)\n🎯 Career Guidance\n💼 Job Finder (Govt + Private)\n🎓 Scholarships & Schemes\n💰 Online Earning Ideas\n\nAap kis cheez mein help chahiye?';
  }
  
  // Default response
  return '🇮🇳 Main IFT AI hoon - aapka digital career guide! Main aapko education, career, jobs aur online earning ke baare mein guide kar sakta hoon. Aap mujhse kuch bhi pooch sakte ho jaise:\n\n• "Mujhe doctor banna hai"\n• "12th ke baad kya karu?"\n• "Government job kaise milegi?"\n• "Online paise kaise kamaye?"\n\nBataiye, main aapki kaise madad kar sakta hoon?';
}

app.listen(PORT, () => {
  console.log(`🚀 IFT AI Server running on http://localhost:${PORT}`);
});
