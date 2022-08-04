import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import {TextField } from "@mui/material";

export const GlobalStyle = createGlobalStyle`
  *{
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      padding: 0;

      &.fundomec{
        background-color: ${(props) => props.theme.colors.fundoLogin};
      }

      &.fundoCard{
        background-color: ${(props) => props.theme.colors.fundoLogin};
      }

      &.datagrid{
        color: ${(props) => props.theme.colors.text};
      }

      &.tituloCadastro{
        color: ${(props) => props.theme.colors.text};
      }

    &.nav{
        background-color: ${(props) => props.theme.colors.nav}; 
    }

  //background do formulario da tela login
    &.botaoPrincipal{
        background-color: ${(props) => props.theme.colors.backgroundInput}; 
  }

    input{
        color: ${(props) => props.theme.colors.text};
        background-color: ${(props) => props.theme.colors.inputBack};
        margin: 5px;
        text-align: center;
        font-size: 24px;
        padding: 5px;
        border-width: 0ch;
        border-radius: 5px; 
        ::placeholder{
          color: ${(props) => props.theme.colors.placeholdertext};
        }  
    }
    form{
        padding-top:60px;
        padding-bottom: 60px;
        background-color: ${(props) => props.theme.colors.fundoLogin};
        border-radius: 20px 100px 20px 100px ;
    }
    a{
        color:#000
    }
    p{
      color: ${(props) => props.theme.colors.text};
      font-size: 24px;
      &.fontLarge{
        font-size: 36px;
      }
      &.bold{
        font-weight: bold;
      }
      &.pequeno{
        font-size: 17.5px;
      }
      @media screen {
        p{
         font-size: 17;
        }
      }
    }
    button{
        margin: 10px;
        border-width: 0px;
        color: #ffffff;
        font-weight: bold;
        border-radius: 4px;
        font-size: 14px;
        background-color: #5C636A;
        width: 85px;
        height: 40px;
        &:hover{
            border-width: 0px;
            background-color: #3e3e3e;
            color: #fff;
        }
    }
  }
  body{
    text-align: center;
    color: ${(props) => props.theme.colors.text2};
    background-color: ${(props) => props.theme.colors.background};
    max-width: 100%;
    min-height: 100vh;
  }
  
`;

export const Botao = styled(Button)`
  background-color: ${(props) => props.theme.colors.botaoSelect}; 
  border-width: 0;
  margin-bottom: 20PX;
  text-align: center;
  width: 80%;
  height: 5rem;
  font-size: 25px;
  font-weight: bold;
  color: #000;
  &:hover{
    border-width: 0px;
    background-color: ${(props) => props.theme.colors.botaoSelecHover}; 
    color: #fff;
    font-weight: bold;
            
        }
`
export const Textfield = styled(TextField)`
  background-color: ${(props) => props.theme.colors.backgroundInput};
  width: 223px;
  border-radius: 5px;
`