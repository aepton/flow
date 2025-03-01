import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
    editCardText,
    escapeStatus,
    confirmEdge,
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    setSpeeches,
    setShiftPressed,
} from "../slices/flowSlice";

export default function handleKeyPresses() {
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.flow.cards);
    const cellId = useSelector((state) => state.flow.cellId);
    const speechId = useSelector((state) => state.flow.speechId);

    function moveHandlerKeyDown({ key, event }) {
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
            if (window.shiftPressed) {
                dispatch(confirmEdge());
            } else if (window.status === "node") {
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
        } else if (key === "Shift") {
            dispatch(setShiftPressed(true));
        }
    }

    function moveHandlerKeyUp({ key, event }) {
        if (key === "Shift") {
            dispatch(setShiftPressed(false));
        }
    }

    React.useEffect(() => {
        window.addEventListener("keydown", moveHandlerKeyDown);
        window.addEventListener("keyup", moveHandlerKeyUp);
        return () => {
            window.removeEventListener("keydown", moveHandlerKeyDown);
            window.removeEventListener("keyup", moveHandlerKeyUp);
        };
    }, []);
}
