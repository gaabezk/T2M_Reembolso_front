import React from "react";
import { Button } from "react-bootstrap";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Header } from "../../components/Header";
// import './Styles.css' ;
import { Botao } from "../../styles/GlobalStyle";

export const Gestor = () => {
  return (
    <div>
      <Header />
      <div style={{ margin: 0, marginTop: "60px" }} className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Botao href="/solicitacoes-geral" className="botaoPrincipal" variant="secondary" size="lg">
            Todas as Solicitações
          </Botao>
          <Botao href="/gestor/aprovar-solicitacoes" className="botaoPrincipal" variant="secondary" size="lg">
            Aprovar Solicitações
          </Botao>
          <Botao href="/minhas-solicitacoes" className="botaoPrincipal" variant="secondary" size="lg">
            Minhas Solicitações
          </Botao>
          <Botao href="/solicitar-reembolso" className="botaoPrincipal" variant="secondary" size="lg">
            Solicitar Reembolso
          </Botao>
          <Botao
            href="/gestor/cadastro"
            className="botaoPrincipal"
            variant="secondary"
            size="lg"
          >
            Gerenciar Cadastro
          </Botao>
          <Botao href="/editar-cadastro" className="botaoPrincipal" variant="secondary" size="lg">
            Minha conta
          </Botao>
          <Botao
            href="/gestor/exclusoes"
            className="botaoPrincipal"
            variant="secondary"
            size="lg"
          >
            Exclusões Gerais
          </Botao>
        </div>
      </div>
    </div>
  );
};
