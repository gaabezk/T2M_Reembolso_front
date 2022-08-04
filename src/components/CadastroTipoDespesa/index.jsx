import * as React from "react";
import { Stack, MenuItem, Button, TextField } from "@mui/material";
import api from "../../services/api"
import { DataContext } from "../../context/data";
import { Textfield } from "../../styles/GlobalStyle";
import { toast } from "react-toastify";

export const CadastroTipoDespesa = () => {

  const { token } = React.useContext(DataContext);
  const [nome, setNome] = React.useState("");

  function enviar() {
    if(nome === null || nome === ""){
      toast.error("Insira um nome")
    } else{
    api
      .post(
        "api/gestor/categoria/post",
        {
          nome: `${nome}`
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
        toast.error("Insira um nome");
      });
  }}

  return (
        <div
          style={{marginTop: "8%" }}
        >
          <h3 className="tituloCadastro" style={{textAlign:"center"}}>Cadastro de tipo de Despesa</h3>
          <Stack style={{ alignItems: "center", marginTop:"8%" }} spacing={2}>
            <Textfield
              className="TextField"
              onChange={(e) => setNome(e.target.value)}
              required
              label="Nome do tipo de despesa"
            />
            <button className="botao" onClick={enviar}>ENVIAR</button>
          </Stack>
        </div>
  );
};
