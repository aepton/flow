import * as React from "react";

import { useDispatch } from "react-redux";
import {
    editCardText,
    escapeStatus,
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    setSpeeches,
} from "../slices/flowSlice";

export default function handleKeyPresses() {
    const [keyPressed, setKeyPressed] = React.useState(false);
    const dispatch = useDispatch();

    function moveHandler({ key, event }) {
        if (key === "ArrowDown") {
            dispatch(moveDown());
        } else if (key === "ArrowUp") {
            dispatch(moveUp());
        } else if (key === "ArrowRight") {
            dispatch(moveRight());
        } else if (key === "ArrowLeft") {
            dispatch(moveLeft());
        } else if (key === "t") {
            window.status = "tagging";
        } else if (key === "Escape") {
            dispatch(escapeStatus());
        } else if (key === "Enter") {
            if (window.status === "node") {
                const text =
                    document.getElementsByClassName("text-entry-node")[0]
                        .innerText;
                const id = document
                    .getElementsByClassName("text-entry-node")[0]
                    .parentElement.parentElement.parentElement.getAttribute(
                        "data-id"
                    )
                    .split("card_")[1];
                dispatch(editCardText({ id, text }));
            } else if (window.status.startsWith("speechHeader")) {
                dispatch(setSpeeches());
                dispatch(moveDown());
            }
        }
    }

    React.useEffect(() => {
        window.addEventListener("keydown", moveHandler);
        return () => {
            window.removeEventListener("keydown", moveHandler);
        };
    }, []);

    return keyPressed;
}
