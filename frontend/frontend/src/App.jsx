import { useState } from "react";

export default function App() {
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rollno, password })
    });

    if (res.ok) {
      setLoggedIn(true);
      alert("Login successful!");
    } else {
      alert("Invalid roll no or password");
    }
  };

  const handleShorten = async () => {
    const res = await fetch("http://localhost:5000/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {!loggedIn ? (
        <div>
          <h2>Login</h2>
          <input
            placeholder="Roll No"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>URL Shortener</h2>
          <input
            placeholder="Enter long URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ width: "300px" }}
          />
          <br />
          <button onClick={handleShorten}>Shorten</button>

          {shortUrl && (
            <p>
              Short URL:{" "}
              <a href={shortUrl} target="_blank" rel="noreferrer">
                {shortUrl}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
