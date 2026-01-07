import React, { useState } from "react";
import axios from "axios";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  async function submit() {
    try {
      setError(null);

      const body = { content };

      if (ttl.trim() !== "") body.ttl_seconds = parseInt(ttl);
      if (views.trim() !== "") body.max_views = parseInt(views);

      const res = await axios.post("/api/pastes", body);

      setUrl(res.data.url);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid input");
    }
  }

  return (
    <div>
      <h2>Create Paste</h2>

      <textarea
        rows="10"
        cols="60"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />

      <input
        placeholder="TTL seconds (optional)"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
      />

      <input
        placeholder="Max views (optional)"
        value={views}
        onChange={(e) => setViews(e.target.value)}
      />

      <button onClick={submit}>Submit</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {url && (
        <div>
          <p>Shareable Link:</p>
          <a href={url}>{url}</a>
        </div>
      )}
    </div>
  );
}
