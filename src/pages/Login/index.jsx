// import "./style.css";
import React, { useContext,useEffect,useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import dark from "../../styles/dark";
import light from "../../styles/light";
import {DataContext} from "../../context/data";
import { toast } from "react-toastify";

export function Login({ navigation }) {

  const { theme,setTheme } = useContext(DataContext);
  const [loginData2, setLoginData2] = useState({})
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const multiple = (e) => {
    e.preventDefault();
    Promise.all([
      api.post(`api/usuario/valid?email=${loginData.email}&senha=${loginData.password}`),
      api.post("login", loginData)
    ])
      .then((response) => {
        console.log(response)
        localStorage.setItem("Authorization2", (JSON.stringify(response[0].data)));
        localStorage.setItem("Authorization", response[1].data);
        const role = response[0].data.perfil;
        const status = response[0].data.status;
         if(localStorage.getItem("Authorization") == "" || localStorage.getItem("Authorization") == null){
          toast.warn("Seu Usuario está Desativado");
        }
        if(role==='ROLE_GESTOR' && status=== "Ativo"){
          navigate({pathname:'/gestor'});
        } else if (role==='ROLE_ADMINISTRATIVO' && status=== "Ativo") {
          navigate({pathname:'/administrativo'});
        } else if (role==='ROLE_COLABORADOR' && status=== "Ativo") {
          navigate({pathname:'/colaborador'});
        }
      })
      .catch((error) => {
        setError(true);
      })
  }
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Authorization2")) === null){
    } 
    else if (JSON.parse(localStorage.getItem("Authorization2")).perfil === "ROLE_GESTOR") {
      navigate({ pathname: "/gestor" });
    }
    else if (JSON.parse(localStorage.getItem("Authorization2")).perfil === "ROLE_ADMINISTRATIVO") {
      navigate({ pathname: "/administrativo" });
    }
    else if (JSON.parse(localStorage.getItem("Authorization2")).perfil === "ROLE_COLABORADOR") {
      navigate({ pathname: "/colaborador" });
    }
  }, []);

  return (
    <div style={{ margin: 0 }} className="row d-flex justify-content-center">
      <Header />
      <div style={{width:'400px',margin:'8.5%'}}>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <form onSubmit={multiple}>
            <p>Sistema de Reembolso</p>
            <strong><p>LOGIN</p></strong>
            {error && <p style={{color:'#ff3333aa',fontWeight:'bolder'}}>Credenciais inválidas</p>}
            <input
              type="text"
              placeholder="Email"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <br />
            <input
              type="password"
              placeholder="Senha"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <br />
            <button style={{fontSize:'24px', width:'200px'}} type="submit">ENVIAR</button>
        <a href="/esqueciminhasenha">
          <p>Esqueci minha senha</p>
        </a>
          </form>
        </div>
      </div>
    </div>
  );
}
