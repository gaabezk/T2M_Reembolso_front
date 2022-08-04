import React from "react";
import { Button } from "react-bootstrap";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Header } from "../../components/Header";
// import './Styles.css' ;
import { Botao } from "../../styles/GlobalStyle";

export const Exclusoes = () => {
  return (
    <div>
      <Header />
      <div style={{ margin: 0, marginTop: "60px" }} className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Botao href="/gestor/excluirusuario" className="botaoPrincipal" variant="secondary" size="lg">
            Desativar Usuarios
          </Botao>
          <Botao href="/gestor/excluircliente" className="botaoPrincipal" variant="secondary" size="lg">
            Desativar Clientes
          </Botao>
          <Botao href="/gestor/excluircategoria" className="botaoPrincipal" variant="secondary" size="lg">
            Excluir Categorias 
          </Botao>
          <div className="container-botaoVoltar">
                <Button href="/gestor" className="botaoVoltar" variant="secondary">
                    Voltar
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};
