import * as React from "react";

import { useSelector, useDispatch } from "react-redux";

import { closeFlyout } from "../slices/flowSlice";


import logoUrl from "../../logo.png";


export default function Flyout(props) {
    const flyoutOpen = useSelector((state) => state.flow.flyoutOpen);

    const dispatch = useDispatch();

    const closeFlyoutEvent = () => {
        dispatch(closeFlyout());
    }

    return (
        <div id="flyout" className={flyoutOpen ? '' : 'hidden'}>
            <h2><img src={logoUrl} id="flyoutLogo" /> Flow</h2>
            <h5>Debate better</h5>
            <span id="closeFlyout" onClick={closeFlyoutEvent}>x</span>
        </div>
    );
}