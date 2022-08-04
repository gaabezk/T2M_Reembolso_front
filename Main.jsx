import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Context from "./src/context/data";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Context>
        <App />
    </Context>
);

