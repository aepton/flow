import * as React from "react";

import { useSelector } from "react-redux";

export default function Flyout(props) {
    const flyoutOpen = useSelector((state) => state.flow.flyoutOpen);

    return (
        <div id="flyout" className={flyoutOpen ? '' : 'hidden'}>
            <h2>Flow</h2>
            <h5>Visualizing argumentation</h5>
        </div>
    );
}