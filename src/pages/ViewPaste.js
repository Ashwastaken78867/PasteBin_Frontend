import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewPaste() {
  const { id } = useParams();

  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setContent(null);
    setError(null);

    axios
      .get(`http://localhost:5000/api/pastes/${id}`)
      .then((res) => setContent(res.data.content))
      .catch((err) => {
        if (err.response?.status === 410) {
          setError("Paste expired - max views reached");
        } else if (err.response?.status === 404) {
          setError("Paste not found");
        } else {
          setError("Paste unavailable");
        }
      });
  }, [id]);

  if (error) return <h3>{error}</h3>;

  if (!content) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>Paste Content</h2>
      <pre>{content}</pre>
    </div>
  );
}
