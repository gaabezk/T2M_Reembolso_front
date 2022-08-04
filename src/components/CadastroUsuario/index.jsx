import { React, useEffect, useState } from "react";
import { Stack, MenuItem, } from "@mui/material";
import api from "../../services/api";
import { Textfield } from "../../styles/GlobalStyle";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

export const CadastroUsuario = () => {

  const [perfil, setPerfil] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [perfis, setPerfis] = useState([
    {
      id: "1",
      nome: "mec",
    },
  ]);

  useEffect(() => {
    const pegarDados = async () => {
      const resposta = await api.get("api/gestor/perfil/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      });
      setPerfis(resposta.data);

    };
    pegarDados();
  }, []);

  function senhasIguais() {
    if (senha === senha2) {
      enviar();
    } else {
      toast.error("Senhas nao coincidem");
    }
  }

  function enviar() {
    api
      .post(
        "api/usuario/post",
        {
          nome: `${nome}`,
          cpf: `${cpf}`,
          email: `${email}`,
          password: `${senha}`,
          usuarioPerfis: [
            {
              perfil: { id: Number(perfil) },
            },
          ],
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
        toast.success("Sucesso!");
      })
      .catch((error) => {
        toast.error("Revise Seus Dados");
      });
  }

  return (
    <div style={{ marginTop: "8%" }}>
      <h3 className="tituloCadastro" style={{ textAlign: "center" }}>Cadastro de Usuario</h3>
      <Stack style={{ alignItems: "center", marginTop: "8%" }} spacing={2}>
        <Textfield
          className="TextField"
          onChange={(e) => setNome(e.target.value)}
          required
          label="Nome Completo"
        />
        <InputMask
          mask="999.999.999-99"
            onChange={(e) => setCpf(e.target.value)}
            required
          maskChar=" "
        >
          {() => <Textfield label="CPF" className="TextField"/>}
        </InputMask>

        <Textfield
          className="TextField"
          onChange={(e) => setEmail(e.target.value)}
          required
          label="Email Valido"
        />
        <Textfield
          className="TextField"
          onChange={(e) => setSenha(e.target.value)}
          required
          label="Senha"
          type="password"
        />
        <Textfield
          className="TextField"
          onChange={(e) => setSenha2(e.target.value)}
          required
          label="Confirmar senha"
          type="password"
        />
        <Textfield
          className="TextField"
          required
          select
          label="Perfil"
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
        >
          {perfis.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.nome.replace("ROLE_","")}
            </MenuItem>
          ))}
        </Textfield>
        <button className="botao" onClick={senhasIguais}>
          ENVIAR
        </button>
      </Stack>
    </div>
  );
};
