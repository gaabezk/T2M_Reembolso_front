import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Button, Container, Modal } from "react-bootstrap";
import api, { api2 } from "../../services/api";
import { Despesas } from "../../components/Despesas";
import { useNavigate } from "react-router-dom";
import { Textfield } from "../../styles/GlobalStyle";
import FormData from "form-data";
import { MenuItem, Stack } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

export const SolicitarReembolso = () => {

  const [referencias, setReferencias] = useState([
    {
      id: 1,
      nome: "mec",
    },
  ]);
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nome: "mec",
    },
  ]);

  const date = new Date().getDate();

  const [anexo, setAnexo] = useState('');
  const [cliente, setCliente] = useState('');
  const [referencia, setReferencia] = useState('');
  const [dataa, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [idDespesa, setIdDespesa] = useState('');

  const [Modalshow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const modalClose = () => setModalShow(false);
  const modalShow = () => setModalShow(true);

  const navigate = useNavigate();

  const [dados, setDados] = useState([]);
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("Authorization2"))
  );

  useEffect(() => {
    const pegarDados = async () => {
      const resposta = await api.get(`api/despesa/get/t/${usuario.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      });
      setDados(resposta.data);
    };
    receberReferencias();
    receberClientes();
    pegarDados();
  }, []);

  function receberReferencias() {
    api
      .get(`api/gestor/categoria/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      })
      .then((response) => {
        setReferencias(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  function receberClientes() {
    api
      .get(`api/cliente/getAtivo`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      })
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  function verificarDataLimite() {
    if (date == 25 || date == 26 || date == 27 || date == 28 || date == 29 || date == 30 || date == 31 || date == 1 || date == 2 || date == 3 || date == 4 || date == 5) {
      toast.warn("Sua prestação de contas será enviada para aprovação e caso aprovada entrará somente no próximo pagamento");
    }
  }

  function deletarDaSolicitacao() {
    const config = {
      method: 'put',
      url: `${api2}api/despesa/deletarDaSolicitacao/${idDespesa}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`
      }
    };

    axios(config)
      .then(function (response) {
        navigate(0);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function enviar() {
    if(!dados.length){
      toast.warn("Você precisa cadastrar uma despesa.")
    } else {
    api
      .post(
        `api/solicitacao/post/${usuario.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      )
      .then((response) => {
        verificarDataLimite()
        toast.success("Sucesso!");
        setTimeout(function(){
          navigate(0);
      },5000);
        
      })
      .catch((error) => {
        toast.error(error.response.headers.error);
      });
  }}

  const novoArray = dados.map((t, index) => {
    return (
      <div key={index} className="col-lg-12 col-md-12 col-sm-12">
        <Container style={{  marginBottom: "20px" , paddingLeft:'20%',paddingRight:'20%'  }}>
          <Despesas
            data={t.data.split('-').reverse().join('/')}
            referencia={t.categoriaDespesa.nome}
            descricao={t.descricao}
            valor={t.valor}
          />
          <button onClick={() => {
            modalShow()
            setIdDespesa(t.id)
          }}
            style={{ margin: 0 }}>
            EXCLUIR
          </button>
        </Container>
      </div>
    );
  });

  async function cadastrar(e) {
    e.preventDefault();
    var data = new FormData();

    const meuJSON = new Blob(
      [
        JSON.stringify({
          data: dataa,
          descricao: descricao,
          valor: valor,
          idCategoriaDespesa: referencia,
          idCliente: cliente,
          idUsuario: usuario.id,
        }),
      ],
      {
        type: "application/json",
      }
    );
    data.append("file", anexo);
    data.append("despesa", meuJSON, { contentType: "application/json" });

    var config = {
      method: "post",
      url: `api/despesa/post`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
      data: data,
    };

    api(config)
      .then(function (response) {
        console.log("sucesso!");
        navigate(0);
      })
      .catch(function (error) {
        toast.error("Revise seus dados!");
      });
  }

  return (
    <div>
      <Header />
      <div className="row" style={{ margin: 0, marginBottom: "40px" }}>
        <button onClick={handleShow} style={{ margin: 0 }}>
          ADICIONAR DESPESA
        </button>
        <button onClick={enviar} style={{ margin: 0, marginBottom: "60px" }}>
          ENVIAR SOLICITAÇÃO
        </button>

        <div className="row" style={{ margin: 0, marginBottom: "40px"}}>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="fundomec"  closeButton>
              <Modal.Title>
                <p>Nova Despesa</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="fundomec" >
              <Stack
                style={{ alignItems: "center", marginTop: "8%" }}
                spacing={2}
              >
                <Textfield
                  className="TextField"
                  onChange={(e) => setData(e.target.value)}
                  required
                  type="date"
                />
                <Textfield
                  className="TextField"
                  required
                  select
                  label="Referência"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                >
                  {referencias.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.nome}
                    </MenuItem>
                  ))}
                </Textfield>
                <Textfield
                  className="TextField"
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                  label="Descricao"
                />
                <Textfield
                  className="TextField"
                  onChange={(e) => setValor(e.target.value)}
                  required
                  type="number"
                  label="Valor"
                />
                <Textfield
                  className="TextField"
                  required
                  select
                  label="Cliente"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                >
                  {clientes.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.nome}
                    </MenuItem>
                  ))}
                </Textfield>
                <Textfield
                  className="TextField"
                  onChange={(e) => setAnexo(e.target.files[0])}
                  required
                  type="file"
                />
              </Stack>
            </Modal.Body>
            <Modal.Footer className="fundomec">
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
              <Button onClick={cadastrar} variant="primary">
                Salvar
              </Button>
            </Modal.Footer>
          </Modal>
          {novoArray}
        </div>
      </div>
      <Modal show={Modalshow} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="tituloModal">Tem certeza que deseja excluir essa Despesa?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="corpoModal">
          <Button variant="secondary" onClick={deletarDaSolicitacao}>
            Sim
          </Button>
          <Button variant="secondary" onClick={modalClose}>
            Não
          </Button>
        </Modal.Body>
      </Modal>

    </div>


  );



};


