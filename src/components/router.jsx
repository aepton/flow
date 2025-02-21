import * as React from "react";
import { Switch, Route } from "wouter";
import Flow from "../pages/flow";

export default () => {
    const params = new URLSearchParams(window.location.search);

    return (
        <Switch>
            <Route>
                <Flow round={params.get("round")} debug={params.get("debug")} />
            </Route>
        </Switch>
    );
};
