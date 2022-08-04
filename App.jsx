import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { DataContext } from "./src/context/data";
import { Rotas } from "./src/routes/Rotas";
import dark from "./src/styles/dark";
import { GlobalStyle } from "./src/styles/GlobalStyle";
import light from "./src/styles/light";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { theme } = useContext(DataContext);
  const [theme2,setTheme2] = useState(theme.title)

  useEffect(() => {
    if(theme.title === 'light'){
      setTheme2('dark');
    }else{
      setTheme2('light');
    }
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Rotas />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme={theme2}
          pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;
