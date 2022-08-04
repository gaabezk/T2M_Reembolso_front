import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios"
import { Header } from "../../../components/Header";
import { api2 } from "../../../services/api";
import { Button, Card, Container, ListGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ExcluirUsuario = () => {

    const navigate = useNavigate();
    const [dados, setDados] = React.useState([]);
    const [idUsuario, setIdUsuario] = React.useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = React.useState(false);

    let data = JSON.stringify({});

    React.useEffect(() => {

        const config = {
            method: 'get',
            url: `${api2}api/usuario/get`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Authorization")}`
            }
        };

        axios(config)
            .then(function (response) {
                setDados(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    function alterarStatus() {
        const config = {
            method: 'put',
            url: `${api2}api/usuario/alterarStatus/${idUsuario}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Authorization")}`
            }
        };

        axios(config)
            .then(function (response) {
                handleClose();
                navigate(0);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const Clientes = ({ id, nome, cpf, email, status }) => {
        return (
            <Card className="fundoCard">
                <ListGroup style={{ textAlign: "left", fontSize: '24px' }}>
                    <ListGroup.Item><strong>ID:</strong> {id}</ListGroup.Item>
                    <ListGroup.Item><strong>Nome:</strong> {nome}</ListGroup.Item>
                    <ListGroup.Item><strong>CPF:</strong> {cpf}</ListGroup.Item>
                    <ListGroup.Item><strong>Email:</strong> {email}</ListGroup.Item>
                    <ListGroup.Item><strong>Status:</strong> {status}</ListGroup.Item>
                </ListGroup>

            </Card>
        );
    };
    const [pesquisa,setPesquisa] = React.useState('');
    return (
        <div className="row" style={{ margin: 0 }}>
            <Header />
            <div>
                <h1 className="tituloSolicitacoes">Lista de Usuarios</h1>
                <input
                    type={'text'}
                    value={pesquisa}
                    placeholder={"Pesquisa"}
                    onChange={event => setPesquisa(event.target.value)}
                />
            </div>
            {dados.filter(t => t.nome.includes(pesquisa)).map((t) => (
                <div key={`cliente_${t.id}`} className="col-lg-4 col-md-6 col-sm-12" >
                    <Container style={{ paddingLeft:'15%',paddingRight:'15%', marginBottom: "20px", marginTop: "20px" }}>
                        <Clientes
                            id={t.id}
                            nome={t.nome}
                            cpf={t.cpf}
                            email={t.email}
                            status={t.status}
                        />
                        <a style={{ marginTop: "20px" }} onClick={() => {
                            setIdUsuario(t.id)
                            handleShow()
                        }} href="#" className="btn btn-primary" >
                            Alterar Status
                        </a>
                    </Container>
                    <div />
                </div>
            ))}
            <div className="container-botaoVoltar">
                <Button href="/gestor/exclusoes" className="botaoVoltar" variant="secondary">
                    Voltar
                </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="tituloModal">Tem certeza que alterar o status desse usuario?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="corpoModal">
                    <Button variant="secondary" onClick={alterarStatus}>
                        Sim
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Não
                    </Button>
                </Modal.Body>
            </Modal></div>)
}


