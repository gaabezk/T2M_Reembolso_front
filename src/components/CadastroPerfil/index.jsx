import * as React from "react";
import { Stack,Alert,AlertTitle, MenuItem, Button, TextField } from "@mui/material";
import api from "../../services/api"
import { DataContext } from "../../context/data";
import { Textfield } from "../../styles/GlobalStyle";
import { toast } from "react-toastify";

export const CadastroPefil = () => {
  const { token } = React.useContext(DataContext)
  const [nome, setNome] = React.useState("");

  function enviar() {
    api
      .post(
        `api/gestor/perfil/post/${nome}`,{
        }
        ,
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
        alert(error.response.headers.error);
      });
  }

  return (
        <div
          style={{ marginTop: "8%" }}
        >
          <h3 className="tituloCadastro" style={{textAlign:"center"}}>Cadastro de Perfil</h3>
          <Stack style={{ alignItems: "center", marginTop:"8%" }} spacing={2}>
            <Textfield
                className="TextField"
              onChange={(e) => setNome(e.target.value)}
              required
              label="Nome do perfil"
            />
            <button className="botao" onClick={enviar}>ENVIAR</button>
          </Stack>
        </div>
  );
};
