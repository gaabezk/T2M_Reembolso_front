// import "./style.css";
import React from "react";
import { Button } from "react-bootstrap";
import { Header } from "../../components/Header";
import { Botao } from "../../styles/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";

export function Administrativo() {
  return (
    <div>
      <Header />
      <div style={{ margin: 0, marginTop: "60px" }} className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Botao
            href="/admnistrativo/aguardando-pagamento"
            className="botaoPrincipal"
            variant="secondary"
            size="lg"
          >
            Solicitações aguardando pagamento
          </Botao>
          <Botao
            href="/admnistrativo/solicitacoesreembolso"
            className="botaoPrincipal"
            variant="secondary"
            size="lg"
          >
            Atribuir solicitação a um gestor
          </Botao>
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
