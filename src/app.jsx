import React from "react";
import { Router } from "wouter";

import '@xyflow/react/dist/style.css';
import "react-widgets/styles.css";
import "./styles/styles.css";

import Seo from "./components/seo.jsx";
import Flow from "./flow.jsx";

export default function Home() {
    const params = new URLSearchParams(window.location.search);

    return (
        <Router>
            <Seo />
            <main role="main" className="wrapper">
                <div className="content">
                <Flow round={params.get("round")} debug={params.get("debug")} />
                </div>
            </main>
        </Router>
    );
}
