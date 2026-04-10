import { useEffect, useState } from "react";
import PGNModal from "./components/PGNModal";
import LayoutBase from "../../components/LayoutBase";
import { API_URL } from "../../services/api_ambient.jsx";

export default function PGN() {
  const [pgns, setPgns] = useState([]);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    id: null,
    titulo: "",
    descricao: "",
    responsavel: "",
    prazo: "",
    status: "Pendente",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  // 🔥 FILTROS
  const [filters, setFilters] = useState({
    titulo: "",
    responsavel: "",
    status: "",
    prazo: "",
  });

  // 🔥 CONTROLE DE INPUT INLINE
  const [activeFilter, setActiveFilter] = useState(null);

  // =========================
  // CARREGAR
  // =========================
  const fetchPGN = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setPgns(data.data);
  };

  useEffect(() => {
    fetchPGN();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleNovo = () => {
    setForm({
      id: null,
      titulo: "",
      descricao: "",
      responsavel: "",
      prazo: "",
      status: "Pendente",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditar = () => {
    if (!selected) {
      alert("Selecione um registro!");
      return;
    }
    setForm(selected);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSelect = (item) => {
    setSelected(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? "PUT" : "POST";

    const response = await fetch(API_URL, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    setMessage(
      data.status === "success"
        ? isEditing
          ? "Atualizado com sucesso!"
          : "Criado com sucesso!"
        : "Erro ao salvar"
    );

    setShowModal(false);
    setSelected(null);
    fetchPGN();
    setTimeout(() => setMessage(""), 2000);
  };

  const handleDelete = async () => {
    if (!selected) return alert("Selecione um registro!");
    if (!confirm("Deseja excluir?")) return;

    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selected.id }),
    });

    const data = await response.json();

    setMessage(
      data.status === "success"
        ? "Excluído com sucesso!"
        : "Erro ao excluir"
    );

    setSelected(null);
    fetchPGN();
    setTimeout(() => setMessage(""), 2000);
  };

  // FILTRO
// função
const formatDate = (dateString) => {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

// filtro
const filteredPGNs = pgns.filter((item) => {
  const normalize = (str) =>
    str?.toString().replaceAll("-", "").replaceAll("/", "").toLowerCase();

  const prazoFormatado = formatDate(item.prazo);
  const prazoItem = normalize(prazoFormatado);
  const prazoFiltro = normalize(filters.prazo);

  return (
    item.titulo?.toLowerCase().includes(filters.titulo.toLowerCase()) &&
    item.responsavel?.toLowerCase().includes(filters.responsavel.toLowerCase()) &&
    item.status?.toLowerCase().includes(filters.status.toLowerCase()) &&
    prazoItem.includes(prazoFiltro)
  );
});


  return (
    <LayoutBase usuario="Lucas">
      {message && <p className="msg-success">{message}</p>}

      <div className="acoes">
        <button onClick={handleNovo}>Novo</button>
        <button onClick={handleEditar}>Editar</button>
        <button onClick={fetchPGN}>Atualizar</button>
        <button onClick={() => setSelected(null)}>Limpar seleção</button>
        <button onClick={handleDelete}>Excluir</button>
      </div>

      <table className="gallery">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>

            {/* 🔥 TITULO COM FILTRO INLINE */}
            <th onClick={() => setActiveFilter("titulo")}>
              {activeFilter === "titulo" ? (
                <input
                  name="titulo"
                  autoFocus
                  placeholder="Filtrar título..."
                  value={filters.titulo}
                  onChange={handleFilterChange}
                  onBlur={() => setActiveFilter(null)}
                />
              ) : (
                "Título 🔍"
              )}
            </th>

            {/* RESPONSAVEL */}
            <th onClick={() => setActiveFilter("responsavel")}>
              {activeFilter === "responsavel" ? (
                <input
                  name="responsavel"
                  autoFocus
                  placeholder="Filtrar..."
                  value={filters.responsavel}
                  onChange={handleFilterChange}
                  onBlur={() => setActiveFilter(null)}
                />
              ) : (
                "Responsável 🔍"
              )}
            </th>

            {/* STATUS */}
            <th onClick={() => setActiveFilter("status")}>
              {activeFilter === "status" ? (
                <input
                  name="status"
                  autoFocus
                  placeholder="Filtrar..."
                  value={filters.status}
                  onChange={handleFilterChange}
                  onBlur={() => setActiveFilter(null)}
                />
              ) : (
                "Status 🔍"
              )}
            </th>

            <th onClick={() => setActiveFilter("prazo")}>
              {activeFilter === "prazo" ? (
                <input
                  name="prazo"
                  autoFocus
                  placeholder="Filtrar data..."
                  value={filters.prazo}
                  onChange={handleFilterChange}
                  onBlur={() => setActiveFilter(null)}
                />
              ) : (
                "Prazo 🔍"
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredPGNs.map((item) => (
            <tr
              key={item.id}
              onClick={() => handleSelect(item)}
              style={{
                background: selected?.id === item.id ? "#dbeafe" : "white",
                cursor: "pointer",
              }}
            >
              <td>
                <input type="radio" checked={selected?.id === item.id} readOnly />
              </td>
              <td>{item.id}</td>
              <td>{item.titulo}</td>
              <td>{item.responsavel}</td>
              <td>{item.status}</td>
              <td>{formatDate(item.prazo)}</td> {/* Recebe a data formatada */}
            </tr>
          ))}
        </tbody>
      </table>

      <PGNModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        form={form}
        handleChange={handleChange}
        isEditing={isEditing}
      />
    </LayoutBase>
  );
}