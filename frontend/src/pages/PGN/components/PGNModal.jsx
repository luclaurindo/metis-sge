// frontend/src/pages/PGN/components/PGNModal.jsx
export default function PGNModal({
  show,
  onClose,
  onSubmit,
  form,
  handleChange,
  isEditing
}) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{isEditing ? "Editar PGN" : "Novo PGN"}</h3>

        <form onSubmit={(e) => {e.preventDefault(); onSubmit(e);}} className="modal-form">
          <input
            name="titulo"
            placeholder="Título"
            value={form.titulo || ""}
            onChange={handleChange}
            required
          />

          <input
            name="descricao"
            placeholder="Descrição"
            value={form.descricao || ""}
            onChange={handleChange}
          />

          <input
            name="responsavel"
            placeholder="Responsável"
            value={form.responsavel || ""}
            onChange={handleChange}
          />

          <input
            type="date"
            name="prazo"
            value={form.prazo || ""}
            onChange={handleChange}
          />

          <select
            name="status"
            value={form.status || "Pendente"}
            onChange={handleChange}
          >
            <option>Pendente</option>
            <option>Em Andamento</option>
            <option>Concluído</option>
            <option>Atrasado</option>
          </select>

          <div className="modal-actions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}