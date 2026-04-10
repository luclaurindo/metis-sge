// frontend/src/services/api_ambient.jsx
const isDev = import.meta.env.DEV;

export const API_URL = isDev
  ? "http://localhost/ProjetoMETIS/backend/api/pgn.php"
  : "/ProjetoMETIS/backend/api/pgn.php";