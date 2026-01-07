import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewPaste() {
  const { id } = useParams();

  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/pastes/${id}`)
      .then((res) => setContent(res.data.content))
      .catch(() => setError("Paste unavailable"));
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
