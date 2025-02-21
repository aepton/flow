import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./app.jsx";
import { HelmetProvider } from "react-helmet-async";
import store from "./store";
import setColorScheme from "./utils/colors";

/**
 * Root of react site
 *
 * Imports Helment provider for the page head
 * And App which defines the content and navigation
 */

// Render the site https://reactjs.org/docs/react-dom.html#render

setColorScheme();

ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
