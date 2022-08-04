import React from "react";
import { Button,ListGroup , Card } from "react-bootstrap";

export const Despesas = ({ data, referencia, descricao, valor }) => {
  return (
    <Card className="fundoCard">
      <ListGroup style={{textAlign:"left", fontSize:'24px'}}>
        <ListGroup.Item><strong>Data:</strong> {data}</ListGroup.Item>
        <ListGroup.Item><strong>Referência:</strong> {referencia}</ListGroup.Item>
        <ListGroup.Item><strong>Descrição:</strong> {descricao}</ListGroup.Item>
        <ListGroup.Item><strong>Valor:</strong> R${valor}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
