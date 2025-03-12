import React from "react";
import ReactDOM from "react-dom";
import App from "./app.jsx";
import { HelmetProvider } from "react-helmet-async";

import setColorScheme from "./utils/colors";

setColorScheme();

ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
