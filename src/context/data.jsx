import { createContext, useEffect, useState } from "react";
import light from "../styles/light";
import dark from "../styles/dark";

export const DataContext = createContext(null)

export default function Context(props){

    const [theme,setTheme] = useState(()=>{
      const storageValue = localStorage.getItem('theme');

      if (storageValue) {
        return JSON.parse(storageValue)
      }else{
       return light;
      }
    }
      );
    const [nome,setNome] = useState('Usuário');
    const [token, setToken] = useState();
    const [role, setRole] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        if(localStorage.getItem("Authorization")){
          setToken(localStorage.getItem("Authorization"));
        }
        if(localStorage.getItem("theme")){
          setTheme(JSON.parse(localStorage.getItem("theme")));
        }  
        // if(localStorage.getItem("Role")){
        //   setRole(localStorage.getItem("Role"))
        // }
        // if(localStorage.getItem("CPF")){
        //   setCPF(localStorage.getItem("CPF"))
        // }
      }, []);
      
    return (
        <DataContext.Provider value={{theme, setTheme, token, nome, role, id, setToken}}>
            {props.children}
        </DataContext.Provider>
    )
}