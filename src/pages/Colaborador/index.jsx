// import "./style.css";
import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Header } from "../../components/Header";
import { Botao } from "../../styles/GlobalStyle";

export function Colaborador() {
  return (
    <div>
      <Header />
      <div style={{ margin: 0, marginTop: "60px" }} className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Botao
            href="/solicitar-reembolso"
            className="botaoPrincipal"
            variant="secondary"
            size="lg"
          >
            Solicitar Reembolso
          </Botao>
          <Botao
            href="minhas-solicitacoes"
            className="botaoPrincipal"
            variant="secondary"
            size="lg"
          >
            Minhas Solicitações
          </Botao>
          <Botao
            href="/editar-cadastro"
            className="botaoPrincipal"
            variant="secondary"
            size="lg"
          >
            Minha conta
          </Botao>
        </div>
      </div>
    </div>
  );
}
