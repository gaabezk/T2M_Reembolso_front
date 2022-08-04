import React, { useContext, useEffect, useState } from "react";
// import "./style.css";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import logo from "../../assets/Images/t2mLogo.png";
import { DataContext } from "../../context/data";
import Switch from "react-switch";
import dark from "../../styles/dark";
import light from "../../styles/light";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Header = () => {

  const navigate = useNavigate();

  const [nome, setNome] = useState(() => {
    const dados = JSON.parse(localStorage.getItem("Authorization2"));
    if (dados) {
      return dados.nome[0].toUpperCase() + dados.nome.substring(1);
    } else {
      return "Usuario";
    }
  });

  const { theme, setTheme } = useContext(DataContext);
  const [toggle, setToggle] = useState();

  useEffect(() => {
    if (theme === light) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme.title === "light") {
      setTheme(dark);
    } else {
      setTheme(light);
    }
  };

  const navegar = () => {
    if (JSON.parse(localStorage.getItem("Authorization2")) === null){
      toast.warn("Faça login primeiro!")
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

  };

  const logout = () => {
    localStorage.removeItem("Authorization2");
    localStorage.removeItem("Authorization");
    navigate({ pathname: "/" })
  }

  return (
    <Navbar className="nav" expand="lg">

      <Container  style={{marginTop:'10px'}}>
        <img src={logo} alt="t2m" />

        <Navbar.Brand href="#home"><p>Olá, {nome}</p></Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" >

            <Nav.Link onClick={navegar}><p>Home</p></Nav.Link>
            <Nav.Link onClick={logout}><p>Logout</p></Nav.Link>
            <button onClick={toggleTheme}>Tema atual: {theme.title}</button>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};
