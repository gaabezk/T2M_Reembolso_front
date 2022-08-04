import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/index";
import { NotFound } from "../pages/NotFound/index";
import { Colaborador } from "../pages/Colaborador";
import { Gestor } from "../pages/Gestor";
import { Administrativo } from "../pages/Administrativo";
import { EsqueciMinhaSenha } from "../pages/EsqueciMinhaSenha";
import { RecuperarSenha } from "../pages/RecuperarSenha";
import { CadastroGeral } from "../pages/CadastroGeral";
import {SolicitacoesAdministrativo} from "../pages/SolicitacoesAdministrativo";
import { Solicitacoes } from "../pages/SolicitacoesGestor";
import { SolicitacoesColab } from "../pages/MinhasSolicitacoes";
import EditarCadastroUsuario from "../pages/EditarCadastroUsuario";
import { SolicitarReembolso } from "../pages/SolicitarReembolso";
import { SolicitacoesGeral } from "../pages/SolicitacoesGeral";
import { Exclusoes } from "../pages/Exclusoes";
import { ExcluirCliente } from "../pages/Exclusoes/ExcluirCliente";
import { ExcluirCategoria } from "../pages/Exclusoes/ExcluirCategoria";
import { ExcluirUsuario } from "../pages/Exclusoes/ExcluirUsuario";
import { SolicitacoesWaitPagamento } from "../pages/SolicitacoesWaitPagamento";


export function Rotas() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/esqueciminhasenha" element={<EsqueciMinhaSenha />} />
          <Route path="/recuperarsenha" element={<RecuperarSenha />} />
          <Route path="/gestor" element={<Gestor />} />
          <Route path="/gestor/exclusoes" element={<Exclusoes />} />
          <Route path="/gestor/excluircliente" element={<ExcluirCliente/>} />
          <Route path="/gestor/excluircategoria" element={<ExcluirCategoria/>} />
          <Route path="/gestor/excluirusuario" element={<ExcluirUsuario/>} />
          <Route path="/editar-cadastro" element={<EditarCadastroUsuario />} />
          <Route path="/gestor/aprovar-solicitacoes" element={<Solicitacoes />}/>
          <Route path="/solicitacoes-geral" element={<SolicitacoesGeral />}/>
          <Route path="/gestor/cadastro" element={<CadastroGeral />} />
          <Route path="/colaborador" element={<Colaborador />} />
          <Route path="/solicitar-reembolso" element={<SolicitarReembolso />} />
          <Route path="/minhas-solicitacoes" element={<SolicitacoesColab />} />
          <Route path="/administrativo" element={<Administrativo />} />
          <Route path="/admnistrativo/solicitacoesreembolso" element={<SolicitacoesAdministrativo />} />
          <Route path="/admnistrativo/aguardando-pagamento" element={<SolicitacoesWaitPagamento />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}
