import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Dummy credentials
const USER = { rollno: "221FA23042", password: "1234" };

// Hardcoded URL mappings
const urlMap = {
  "abc123": "https://www.google.com",
  "xyz789": "https://www.wikipedia.org",
  "lmn456": "https://www.github.com"
};

// Authentication endpoint
app.post("/login", (req, res) => {
  const { rollno, password } = req.body;
  if (rollno === USER.rollno && password === USER.password) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Shorten URL (create a short code)
app.post("/shorten", (req, res) => {
  const { url } = req.body;

  // check if already exists
  for (let key in urlMap) {
    if (urlMap[key] === url) {
      return res.json({ shortUrl: `http://localhost:5000/${key}` });
    }
  }

  // generate a dummy short code
  const shortCode = Math.random().toString(36).substring(2, 8);
  urlMap[shortCode] = url;

  res.json({ shortUrl: `http://localhost:5000/${shortCode}` });
});

// Redirect short URL to original
app.get("/:code", (req, res) => {
  const code = req.params.code;
  const longUrl = urlMap[code];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send("Short URL not found");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
