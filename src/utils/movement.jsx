import * as React from "react";

import { useDispatch } from "react-redux";
import {
  editCardText,
  escapeStatus,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
} from "../slices/flowSlice";

export default function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = React.useState(false);
  const dispatch = useDispatch();

  function moveHandler({ key, event }) {
    if (key === targetKey) {
      if (targetKey === "ArrowDown") {
        if (window.status === "navigating") {
          dispatch(moveDown());
        }
      } else if (targetKey === "ArrowUp") {
        if (window.status === "navigating") {
          dispatch(moveUp());
        }
      } else if (targetKey === "ArrowRight") {
        if (window.status === "navigating") {
          dispatch(moveRight());
        }
      } else if (targetKey === "ArrowLeft") {
        if (window.status === "navigating") {
          dispatch(moveLeft());
        }
      } else if (targetKey === "t") {
        window.status = "tagging";
      } else if (targetKey === "Escape") {
        dispatch(escapeStatus());
      } else if (targetKey === "Enter") {
        if (window.status === "node") {
          const text =
            document.getElementsByClassName("text-entry-node")[0].innerText;
          const id = document
            .getElementsByClassName("text-entry-node")[0]
            .parentElement.parentElement.parentElement.getAttribute("data-id")
            .split("card_")[1];
          console.log("got id", id, text);
          dispatch(editCardText({ id, text }));
        }
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
