import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/styles.css";

export default function LayoutBase({ usuario, children }) {

  const location = useLocation();
  const isHome = location.pathname === "/";

  // Saudação baseada na hora
  const hora = new Date().getHours();
  let saudacao = "Boa noite";
  if (hora >= 5 && hora < 12) saudacao = "Bom dia";
  else if (hora >= 12 && hora < 18) saudacao = "Boa tarde";

  const primeiroNome = usuario?.split(" ")[0] || "Usuário";

  return (
    <div className="tela-galeria-ar" style={{ minHeight: "100vh" }}>
      <header>
        <div className="topo-conteudo">
          <h1>METIS-SGE</h1>
        </div>

        <div className="saudacao-container">
          <h2>{`${saudacao}, ${primeiroNome}!`}</h2>
        </div>
      </header>
    

      <div className="bloco-sobreposto">

        {/* MENU SÓ NA HOME */}
        {isHome && (
          <div className="menu-grid">
            <Link to="/" className="card-menu">
              <img src="https://cdn-icons-png.flaticon.com/512/15878/15878167.png" alt="Dashboard" />
              <h3>Dashboard</h3>
              <p>Visão geral das atividades</p>
            </Link>

            <Link to="/pgn" className="card-menu">
              <img src="https://cdn-icons-png.flaticon.com/512/7727/7727282.png" alt="PGN" />
              <h3>PGN</h3>
              <p>Gestão de PGNs</p>
            </Link>

            <Link to="/agn" className="card-menu">
              <img src="https://cdn-icons-png.flaticon.com/512/9375/9375549.png" alt="AGN" />
              <h3>AGN</h3>
              <p>Gestão de AGNs</p>
            </Link>

            <Link to="/apsp" className="card-menu">
              <img src="https://cdn-icons-png.flaticon.com/512/10771/10771704.png" alt="APSP" />
              <h3>APSP</h3>
              <p>Gestão de APSPs</p>
            </Link>

            <Link to="/mi" className="card-menu">
              <img src="https://cdn-icons-png.flaticon.com/512/15710/15710426.png" alt="MI" />
              <h3>MI</h3>
              <p>Gestão de MIs</p>
            </Link>
          </div>
        )}

        {/* CONTEÚDO SÓ FORA DA HOME */}
        {!isHome && children && (
          <div className="conteudo">
            {children}
          </div>
        )}

      </div>
    </div>
  );
}