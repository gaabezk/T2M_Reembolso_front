// import "./style.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "../../components/Header";
import api from "../../services/api";
import { Navigate, useNavigate } from "react-router-dom";

export function EsqueciMinhaSenha() {
  const navigate = useNavigate();
  const [email,setEmail] = useState();

  const mandarCodigo = async () => {
    const resposta = await api.put(
      `api/usuario/sendcode`,
      {
        email: `${email}`,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      }
    );
    navigate({pathname:'/recuperarsenha'});
  };

  return (
    <div>
      <Header />
      <p style={{ marginTop: "45px" }} className="bold fontLarge">
        Esqueci Minha Senha
      </p>
      {console.log(email)}
      <p className="bold">Para redefinir senha, informe o E-mail cadastrado</p>
      <div className="senhaEBotao">
        <Form.Group
          className="container col-12 col-md-8 p-3 "
          controlId="formBasicEmail"
        >
          <Form.Label className="w-100 text-start">
            <strong>
              <p> Digite o E-mail cadastrado </p>
            </strong>
          </Form.Label>
          <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Digite o e-mail" />
        </Form.Group>
        <Button onClick={mandarCodigo} variant="secondary" className="col-3 p-2 mt-2 ms-4">
          Verificar
        </Button>
      </div>
    </div>
  );
}
