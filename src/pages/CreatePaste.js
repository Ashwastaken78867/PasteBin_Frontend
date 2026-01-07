import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [pasteId, setPasteId] = useState(null);
  const [error, setError] = useState(null);

  async function submit() {
    try {
      setError(null);

      const body = { content };

      if (ttl.trim() !== "") body.ttl_seconds = parseInt(ttl);
      if (views.trim() !== "") body.max_views = parseInt(views);

      const res = await axios.post("http://localhost:5000/api/pastes", body);

      setPasteId(res.data.id);
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

      {pasteId && (
        <div>
          <p>Open Paste in App:</p>
          <Link to={`/p/${pasteId}`}>{`${window.location.origin}/p/${pasteId}`}</Link>
        </div>
      )}
    </div>
  );
}
