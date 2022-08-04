import * as React from "react";
import { Stack } from "@mui/material";
import { Header } from "../../components/Header";
import { Botao, Textfield } from "../../styles/GlobalStyle";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function EditarCadastroUsuario() {
  const [usuarioData, setUsuarioData] = React.useState(
    JSON.parse(localStorage.getItem("Authorization2"))
  );
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [senha2, setSenha2] = React.useState("");

  function senhasIguais() {
    if (senha === senha2) {
      enviar();
    } else {
      alert("Senhas nao coincidem");
    }
  }

  const navigate = useNavigate();

  function enviar() {
    api
      .put(
        `api/usuario/${usuarioData.id}`,
        {
          nome: `${nome}`,
          email: `${email}`,
          password: `${senha}`,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        alert("Sucesso!");
        localStorage.removeItem("Authorization2");
        localStorage.removeItem("Authorization");
        navigate({ pathname: "/" });
      })
      .catch((error) => {
        alert(error.response.headers.error);
      });
  }

  return (
    <div className="row" style={{ margin: 0 }}>
      <Header />
      <h3
        className="tituloCadastro"
        style={{ textAlign: "center", marginTop: "5%" }}
      >
        Alterar dados
      </h3>

      <Stack style={{ alignItems: "center", marginTop: "5%" }} spacing={2}>
        <Textfield
          className="TextField"
          onChange={(e) => setNome(e.target.value)}
          label="Alterar Nome Completo"
        />
        <Textfield
          className="TextField"
          onChange={(e) => setEmail(e.target.value)}
          label="Alterar Email"
        />
        <Textfield
          type="password"
          className="TextField"
          onChange={(e) => setSenha(e.target.value)}
          label="Alterar Senha"
        />
        <Textfield
          type="password"
          className="TextField"
          onChange={(e) => setSenha2(e.target.value)}
          label="Repetir Senha"
        />
        <button className="botao" onClick={senhasIguais}>
          ENVIAR
        </button>
      </Stack>
    </div>
  );
}

export default EditarCadastroUsuario;
