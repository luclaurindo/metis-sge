// frontend/src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import PGN from "../pages/PGN";
import AGN from "../pages/AGN";
import APSP from "../pages/APSP";
import MI from "../pages/MI";

const basename = import.meta.env.DEV ? "/" : "/ProjetoMETIS";

export default function AppRoutes() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pgn" element={<PGN />} />
        <Route path="/agn" element={<AGN />} />
        <Route path="/apsp" element={<APSP />} />
        <Route path="/mi" element={<MI />} />
      </Routes>
    </BrowserRouter>
  );
}