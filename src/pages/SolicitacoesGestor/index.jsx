import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./style.css";
import api, { api2 } from "../../services/api";
import { Button, Card, Container, ListGroup, Modal } from "react-bootstrap";
import axios from "axios";
import { Header } from "../../components/Header";
import { Despesas } from "../../components/Despesas";
import { useNavigate } from "react-router-dom";
import { Input, Stack } from "@mui/material";
import { Textfield } from "../../styles/GlobalStyle";
import { toast } from "react-toastify";

// ========= Pagina para GESTOR acessar solicitaçoes atribuidas a ele ========================================/
export const Solicitacoes = () => {

  const [idSolicitacao, setIdSolicitacao] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [total, setTotal] = React.useState(0);
  const [dados, setDados] = React.useState([]);
  const [dados2, setDados2] = React.useState([]);
  const [usuario, setUsuario] = React.useState(
    JSON.parse(localStorage.getItem("Authorization2"))
  );
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  let data = JSON.stringify({});

  React.useEffect(() => {
    const pegarDados = async () => {
      const resposta = await api.get(
        `api/solicitacao/getPorGestor/${usuario.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      );
      setDados(resposta.data);
    };
    pegarDados();
  }, []);

  const novoArray = dados.map((t, index) => {
    return (
      <div key={index} className="col-lg-12 col-md-12 col-sm-12">
        <Container style={{ paddingLeft:'15%',paddingRight:'15%', marginBottom: "20px",marginTop: "20px" }}>
          <Card className="fundoCard">
            <ListGroup style={{ textAlign: "left", fontSize: "24px" }}>
              <ListGroup.Item>
                <strong>ID:</strong> {t.id}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Data:</strong> {t.data.split("-").reverse().join("/")}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Usuario:</strong> {t.usuario.nome}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Total:</strong> R${t.total}
              </ListGroup.Item>
              <button
                onClick={() => {
                  abrirModal(t.id);
                  setTotal(t.total);
                  setEmail(t.usuario.email);
                  setIdSolicitacao(t.id);
                }}
                style={{ alignSelf: "center" }}
              >
                Detalhes
              </button>
            </ListGroup>
          </Card>
        </Container>
      </div>
    );
  });

  const abrirModal = (id) => {
    handleShow();
    api
      .get(
        `api/despesa/getPorSolicitacao/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      )
      .then((response) => {
        setDados2(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const novoArray2 = dados2.map((t, index) => {
    return (
      <div key={index} className="col-lg-12 col-md-12 col-sm-12">
        <Container style={{ paddingLeft:'15%',paddingRight:'15%', marginBottom: "20px", marginTop: "20px"}}>
          <Despesas
            data={t.data.split("-").reverse().join("/")}
            referencia={t.nomeCategoriaDespesa}
            descricao={t.descricao}
            valor={t.valor}
          />
          <a href={t.url} target="_blank">
            ANEXO
          </a>
        </Container>
      </div>
    );
  });

  let aprovar = () =>{
    const resolvePromise = new Promise((resolve,reject) => {
        if(msg === "" || msg === null) {
          toast.error("O Campo de email não pode estar vazio");
          reject()
        } else{
        handleClose();
        api
          .put(
            `api/solicitacao/aprovar/${idSolicitacao}`,
            {
              emailTo: `${email}`,
              subject: "Analise de solicitação",
              text: `${msg}`
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
              },
            }
          )
          .then((response) => {
            resolve()
            console.log(response.data);
            setTimeout(function(){
              navigate(0);
          },2000);
          })
          .catch((error) => {
            reject()
            console.log(error);
            setTimeout(function(){
              navigate(0);
          },2000);
          });
      };
    });
    toast.promise(resolvePromise,{
      pending: "Loading...",
      success: "Sucesso!",
      error: "Ocorreu um erro!",
    });
  }


  let reprovar = () =>{
    const resolvePromise = new Promise((resolve,reject) => {
        if(msg === "" || msg === null) {
          toast.error("O Campo de email não pode estar vazio");
          reject()
        } else{
        handleClose();
        api
          .put(
            `api/solicitacao/reprovar/${idSolicitacao}`,
            {
              emailTo: `${email}`,
              subject: "Analise de solicitação",
              text: `${msg}`
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
              },
            }
          )
          .then((response) => {
            resolve()
            console.log(response.data);
            setTimeout(function(){
              navigate(0);
          },2000);
          })
          .catch((error) => {
            reject()
            console.log(error);
            setTimeout(function(){
              navigate(0);
          },2000);
          });
      };
    });
    toast.promise(resolvePromise,{
      pending: "Loading...",
      success: "Sucesso!",
      error: "Ocorreu um erro!",
    });
  }


  return (
    <div className="row background" style={{ margin: 0 }}>
      <Header />
      <div className="col-lg-6 col-md-12 col-sm-12">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>Detalhes da solicitação</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {novoArray2}
            <p>VALOR TOTAL: {total}</p>
          </Modal.Body>
          <div className="form-group" style={{alignSelf:'center',width:"90%"}}>
            <p>Resposta por e-mail:</p>
            <textarea
              className="form-control"
              style={{fontSize:'24px',textAlign:"center"}}
              rows="3"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              
            ></textarea>
          </div>
          <Modal.Footer style={{ alignSelf: "center" }}>
            <Button variant="secondary" onClick={reprovar}>
              Reprovar
            </Button>
            <Button onClick={aprovar} variant="primary">
              Aprovar
            </Button>
          </Modal.Footer>
        </Modal>
        {novoArray}
      </div>
    </div>
  );
};
