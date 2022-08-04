import "./style.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Header } from "../../components/Header";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import api, { api2 } from "../../services/api";
import axios from "axios";
import { Textfield } from "../../styles/GlobalStyle";
import { MenuItem } from "@mui/material";
import { Card, Container, ListGroup, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// PAGINA DO ADMINISTRATIVO PARA ATRIBUIR UMA SOLICITACAO DE REEMBOLSO A UM GESTOR =====================================//
export function SolicitacoesAdministrativo() {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [gestor, setGestor] = useState("");
  const [dataBack, setDataBack] = useState("");
  const [show, setShow] = useState(false);
  const [dados, setDados] = useState([]);

  const [perfis, setPerfis] = useState([{}]);

  const [usuario, setUsuario] = React.useState(
    JSON.parse(localStorage.getItem("Authorization2"))
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const pegarDados = async () => {
      const resposta = await api.get(`api/usuario/getPorPerfil/1`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      });
      setPerfis(resposta.data);
    };
    pegarDados();
    receberSolicitacoes();
  }, []);

  function receberSolicitacoes() {
    {
      const config = {
        method: "get",
        url: `${api2}api/solicitacao/get2`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      };
      axios(config)
        .then(function (response) {
          console.log("GETTTT", response.data);
          setDados(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  function editar() {
    var data = JSON.stringify({
      gestor: `${gestor}`,
    });

    if(gestor == "" || gestor == null){
      toast.error("Selecione um gestor")
    }else{
    var config = {
      method: "put",
      url: `${api2}api/solicitacao/put/${codigo}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        "Content-Type": "application/json",
      },
      data: data,
    }};

    axios(config)
      .then(function (response) {
        handleClose();
        toast.success(JSON.stringify(response.data));
        setTimeout(function(){
          navigate(0);
      },3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const Solicitacoes = ({ id, nome, data, status }) => {
    return (
      <Card className="fundoCard">
        <ListGroup style={{ textAlign: "left", fontSize: "24px" }}>
          <ListGroup.Item>
            <strong>ID:</strong> {id}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Nome do Solicitante:</strong> {nome}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Data:</strong> {data}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Status:</strong> {status}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  };

  return (
    <div className="row" style={{ margin: 0 }}>
      <Header />
      <div>
        <h1 className="tituloSolicitacoes">Solicitações de Reembolso</h1>
        <Button
          href="/administrativo"
          className="botaoVoltar"
          variant="secondary"
        >
          Voltar
        </Button>
      </div>
      {dados.map((t) => (
        <div
          key={`solicitacao_${t.id}`}
          className="col-lg-12 col-md-12 col-sm-12"
        >
          <Container
            style={{
              paddingLeft: "15%",
              paddingRight: "15%",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Solicitacoes
              id={t.id}
              nome={t.nome}
              data={t.data.split("-").reverse().join("/")}
              status={t.status}
            />
            <a
              style={{ marginTop: "10px" }}
              onClick={() => {
                setCodigo(t.id);
                handleShow();
              }}
              href="#"
              className="btn btn-primary"
            >
              Atribuir gestor
            </a>
          </Container>
          <div />
        </div>
      ))}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="tituloModal">Atribuir</Modal.Title>
        </Modal.Header>
        <Modal.Body className="corpoModal">
          <Stack>
            <Textfield
              className="TextField"
              required
              select
              label="Gestor"
              value={gestor}
              onChange={(e) => setGestor(e.target.value)}
            >
              {perfis.map((option) => (
                <MenuItem key={`perfis_${option.id}`} value={option.id}>
                  {option.nome}
                </MenuItem>
              ))}
            </Textfield>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={editar}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <button className="botao" onClick={enviar}>
          ENVIAR
        </button> */}
      <div className="container-botaoVoltar"></div>
    </div>
  );
}
