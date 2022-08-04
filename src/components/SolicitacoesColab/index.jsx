import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./style.css"
import axios from "axios"
import api, { api2 } from '../../services/api'
const columns = [
  {
    field: "id",
    headerName: "Código",
    width: 150,
    editable: false,
  },
  {
    field: "data",
    headerName: "Data",
    width: 150,
    editable: false,
  },
  {
    field: "status",
    headerName: "status",
    width: 150,
    editable: false,
  }
];

export const SolicitacoesColab = () => {

  const[dados,setDados] = React.useState([]);
  const [usuario,setUsuario] = React.useState(JSON.parse(localStorage.getItem('Authorization2')))

  let data = JSON.stringify({});
  
   React.useEffect(() => {

    const config = {
      method: 'get',
      url: `${api2}api/solicitacao/get/${usuario.id}`,
    };
    
    axios(config)
    .then(function (response) {
      setDados (JSON.parse(JSON.stringify(response.data)))
    })
    .catch(function (error) {
      console.log(error);
    });
 }, []);

  return (
    <div className="row background" style={{margin:0}} >
      <div className="col-lg-6 col-md-12 col-sm-12">
      <Box sx={{ height: 400, width: "80%" }}>
        <DataGrid
          rows={dados}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </div>
    </div>
  );
};