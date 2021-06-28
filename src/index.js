import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SWContextProvider } from "./store/sw-context";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <SWContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </SWContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
