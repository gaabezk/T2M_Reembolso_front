import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./style.css"
import axios from "axios"
import { Header } from "../../components/Header";
import { api2 } from "../../services/api";
import { Card, Container, ListGroup } from "react-bootstrap";

export const SolicitacoesColab = () => {

  const[dados,setDados] = React.useState([]);
  const [usuario,setUsuario] = React.useState(JSON.parse(localStorage.getItem('Authorization2')))

  let data = JSON.stringify({});
  
   React.useEffect(() => {

    const config = {
      method: 'get',
      url: `${api2}api/solicitacao/getPorUsuario/${usuario.id}`,
    };
    
    axios(config)
    .then(function (response) {
      setDados(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
 }, []);

 const Solicitacoes = ({ id, data, status }) => {
    return (
      <Card className="fundoCard">
        <ListGroup style={{textAlign:"left", fontSize:'24px'}}>
            <ListGroup.Item><strong>ID:</strong> {id}</ListGroup.Item>
            <ListGroup.Item><strong>Data:</strong> {data}</ListGroup.Item>
            <ListGroup.Item><strong>Status:</strong> {status}</ListGroup.Item>
        </ListGroup>
      </Card>
    );
  };

  return (
    <div className="row" style={{ margin: 0 }}>
      <Header />
      <div>
          <p className="tituloSolicitacoes">Solicitações de Reembolso</p>
        </div>
        {dados.map((t) => (
        <div key={`solicitacao_${t.id}`} className="col-lg-12 col-md-12 col-sm-12">
          <Container style={{ paddingLeft:'15%',paddingRight:'15%', marginBottom: "20px", marginTop: "20px" }}>
          <Solicitacoes
            id={t.id}
            data={t.data.split('-').reverse().join('/')}
            status={t.status}
          />
          </Container>
          <div/> 
          </div>
    ))}</div>)}
