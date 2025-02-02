import * as React from "react";
import { useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";

import { closeFlyout, moveDown, setSpeeches } from "../slices/flowSlice";

export default function SpeechHeaders(props) {
  const editing = useSelector((state) => state.flow.editingMode);
  const moderators = useSelector((state) => state.flow.moderators);
  const speeches = useSelector((state) => state.flow.speeches) || [];
  const status = useSelector((state) => state.flow.status);

  const dispatch = useDispatch();

  const closeFlyoutEvent = () => {
    dispatch(closeFlyout());
  };

  const setStatus = () => {
    window.status = "speech-label";
  };

  const moderatorTag = " (moderator)";

  const autofocusInput = useCallback((inputElement) => {
    if (inputElement) {
      setTimeout((x) => inputElement.focus(), 100);
    }
  }, []);

  const setHeaders = (evt) => {
    if (status.startsWith('speechHeader') && evt.code === "Enter") {
      evt.stopPropagation();
      evt.preventDefault();

      const speeches = [];
      Array.from(document.getElementsByClassName("speechLabel")).forEach(
        (speech) => {
          speeches.push({
            label: speech.innerText
              .replace("<br>", "")
              .replace(/[\n\r]+/g, "")
              .replace(moderatorTag, "")
              .trim(),
            id: speech.getAttribute("data-speechid"),
          });
        },
      );
      dispatch(setSpeeches(speeches));
      // document.getElementById(status).innerHTML = "";
      dispatch(moveDown());
    }
  };

  const speechNav = [];
  speeches.forEach((speech, idx) => {
    speechNav.push(
      <span
        style={{
          left: props.columnWidth * idx + (props.columnPadding * idx + 1),
          width: props.columnWidth,
        }}
        className={`speechLabel ${moderators.indexOf(speech.id) !== -1 ? "moderatorSpeech" : ""}`}
        contentEditable={editing && status === `speechHeader${idx}`}
        id={`speechHeader${idx}`}
        data-speechid={speech.id}
        onClick={setStatus}
        onKeyDown={setHeaders}
        key={`speechNav${idx}`}
        ref={editing && status === `speechHeader${idx}` ? autofocusInput : null}
      >
        {speech.label}
        {moderators.indexOf(speech.id) !== -1 ? moderatorTag : ""}
      </span>,
    );
  });

  const width = speeches.length * (props.columnWidth + props.columnPadding);

  return (
    <div
      id="speeches"
      style={{ width: `${window.innerWidth - 10}px` }}
      onClick={closeFlyoutEvent}
    >
      {speechNav}
    </div>
  );
}
