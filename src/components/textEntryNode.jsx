import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addCardAfter } from "../slices/flowSlice";

export function TextEntryNode({ data }) {
    const dispatch = useDispatch();
    const speechId = useSelector((state) => state.flow.speechId);

    const onChange = useCallback((event) => {
        if (event.target.value.includes("\n")) {
            const val = event.target.value.replace("\n", "");
            if (val != "") {
                dispatch(addCardAfter({ card: val, speechId }));
                event.target.value = "";
            }
        }
    }, []);

    const autofocusInput = useCallback((inputElement) => {
        if (inputElement) {
            setTimeout((x) => inputElement.focus(), 100);
        }
    }, []);

    return (
        <div className="text-entry-node">
            <textarea name="text" onChange={onChange} ref={autofocusInput} />
        </div>
    );
}

export function generateEntryNode(
    speechId,
    cardsLength,
    columnWidth,
    columnPadding
) {
    return {
        id: "card-entry-" + speechId,
        position: {
            x: columnWidth * speechId + (columnPadding * speechId + 1),
            y: 100 * (cardsLength + 1.2),
        },
        type: "textEntry",
        style: { border: "none", width: columnWidth },
    };
}
