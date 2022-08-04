import * as React from "react";
import { Stack, MenuItem, Button, TextField } from "@mui/material";
import api from "../../services/api";
import { DataContext } from "../../context/data";
import "./style.css";
import { Textfield } from "../../styles/GlobalStyle";
import { toast } from "react-toastify";

export const CadastroCliente = () => {
  const { token } = React.useContext(DataContext);
  const [nome, setNome] = React.useState("");
  const [cidade, setCidade] = React.useState("");
  const [estado, setEstado] = React.useState("");

  function enviar() {
    api
      .post(
        "api/cliente/post",
        {
          nome: `${nome}`,
          cidade: `${cidade}`,
          estado: `${estado}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        toast.success("Sucesso!");
      })
      .catch((error) => {
        toast.error(error.response.headers.error);
      });
  }

  return (
    <div style={{ marginTop: "8%" }}>
      <h3 className="tituloCadastro" style={{ textAlign: "center" }}>
        Cadastro de Cliente
      </h3>
      <Stack style={{ alignItems: "center", marginTop: "8%" }} spacing={2}>
        <Textfield
          className="TextField"
          onChange={(e) => setNome(e.target.value)}
          required
          label="Nome do Cliente"
        />
        <Textfield
          className="TextField"
          onChange={(e) => setCidade(e.target.value)}
          required
          label="Cidade"
        />
        <Textfield
          className="TextField"
          onChange={(e) => setEstado(e.target.value)}
          required
          label="Estado"
        />
        <button className="botao" onClick={enviar}>
          ENVIAR
        </button>
      </Stack>

    </div>
  );
};
