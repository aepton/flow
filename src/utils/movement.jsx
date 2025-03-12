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
    setStatus,
} from "../slices/flowSlice";

export default function handleKeyPresses() {
    const dispatch = useDispatch();
    const { cards, cellId, editingCardId, shiftPressed, speechId, status } =
        useSelector((state) => state.flow);

    function moveHandlerKeyDown({ key }) {
        console.log(key);
        if (key === "ArrowDown") {
            dispatch(moveDown());
        } else if (key === "ArrowUp") {
            dispatch(moveUp());
        } else if (key === "ArrowRight") {
            dispatch(moveRight());
        } else if (key === "ArrowLeft") {
            dispatch(moveLeft());
        } else if (key === "t") {
            dispatch(setStatus("tagging"));
        } else if (key === "Escape") {
            dispatch(escapeStatus());
        } else if (key === "Enter") {
            console.log('got enter', shiftPressed);
            if (shiftPressed) {
                dispatch(confirmEdge());
            } else if (status === "node") {
                const text =
                    document.getElementsByClassName("text-entry-node")[0]
                        .innerText;
                dispatch(editCardText({ id: editingCardId, text }));
            } else if (status.startsWith("speechHeader")) {
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
