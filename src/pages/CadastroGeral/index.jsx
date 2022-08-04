import { CadastroPefil } from "../../components/CadastroPerfil";
import { CadastroCliente } from "../../components/CadastroCliente";
import { CadastroTipoDespesa } from "../../components/CadastroTipoDespesa";
import { CadastroUsuario } from "../../components/CadastroUsuario";
import { Button } from "react-bootstrap";
// import "./style.css";
import { Header } from "../../components/Header";

export function CadastroGeral() {
  return (
    <div>
      <Header/>
      <Button href="/gestor" className="botaoVoltar" variant="secondary">
        Voltar
      </Button>
      <div className="row cadastro" style={{margin:0}}>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <CadastroUsuario />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <CadastroCliente />
          <CadastroTipoDespesa />
        </div>
      </div>
    </div>
  );
}
