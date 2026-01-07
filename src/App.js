import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreatePaste from "./pages/CreatePaste.js";
import ViewPaste from "./pages/ViewPaste.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePaste />} />
        <Route path="/p/:id" element={<ViewPaste />} />
      </Routes>
    </BrowserRouter>
  );
}
