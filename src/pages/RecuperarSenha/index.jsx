// import "./style.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "../../components/Header";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../services/api";

export function RecuperarSenha() {
  const navigate = useNavigate();
  const [codigo,setCodigo] = useState();
  const [email,setEmail] = useState();
  const [senha,setSenha] = useState();
  const [senha2,setSenha2] = useState();

  const redefinirSenha = async () => {
    if(senha === senha2){
      const resposta = await api.post(
        `api/usuario/esquecisenha`,
        {
          codigo: `${codigo}`,
          email: `${email}`,
          senha: `${senha}`
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      );
      navigate({pathname:'/'});
    };
    }

    


  return (
    <div>
      <Header />
      <p className="bold fontLarge">Recuperar Senha</p>
      <div className="senhaEBotao">


        <Form.Group
          className="container col-12 col-md-4 p-3 "
          controlId="formBasicPassword"
        >
          <Form.Label className="w-100 text-start">
            <p>Digite o código recebido por E-mail</p>
          </Form.Label>
          <Form.Control onChange={(e) => setCodigo(e.target.value)} type="text" placeholder="Digite o código" />
        </Form.Group>


        <Form.Group
          className="container col-12 col-md-4 p-3 "
          controlId="formBasicPassword"
        >
          <Form.Label className="w-100 text-start">
            <p>Digite seu E-mail</p>
          </Form.Label>
          <Form.Control onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Digite seu Email" />
        </Form.Group>

        <Form.Group
          className="container col-12 col-md-4 p-3 "
          controlId="formBasicPassword"
        >
          <Form.Label className="w-100 text-start">
            <p>Digite a Nova Senha</p>
          </Form.Label>
          <Form.Control onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Digite a nova senha" />
        </Form.Group>


        <Form.Group
          className="container col-12 col-md-4 p-3 "
          controlId="formBasicPassword"
        >
          <Form.Label className="w-100 text-start">
            <p>Digite novamente a sua Senha</p>
          </Form.Label>
          <Form.Control onChange={(e) => setSenha2(e.target.value)} type="password" placeholder="Digite a senha" />
        </Form.Group>



        <Button onClick={redefinirSenha} variant="secondary" className="col-3 p-2 mt-2 ms-4">
          Recuperar
        </Button>


      </div>
    </div>
  );
}
