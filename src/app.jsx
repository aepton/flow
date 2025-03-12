import React from "react";
import { Router } from "wouter";

import { ReactFlowProvider } from "@xyflow/react";

import Seo from "./components/seo.jsx";
import Flow from "./flow.jsx";

import { Provider } from "react-redux";
import store from "./store";
import TopNav from "./components/topNav";

import "@xyflow/react/dist/style.css";
import "react-widgets/styles.css";
import "./styles/styles.css";

export default function Home() {
    const params = new URLSearchParams(window.location.search);

    return (
        <Router>
            <Seo />
            <main role="main" className="wrapper">
                <div className="content">
                    <Provider store={store}>
                        <ReactFlowProvider>
                                <TopNav debug={params.get("debug")} />
                                <Flow
                                    round={params.get("round")}
                                    debug={params.get("debug")}
                                />
                        </ReactFlowProvider>
                    </Provider>
                </div>
            </main>
        </Router>
    );
}
