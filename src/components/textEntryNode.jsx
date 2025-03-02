import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addCardAfter } from "../slices/flowSlice";
import { generateTagsFromText } from "../utils/tagging";

export function TextEntryNode({ data }) {
    const dispatch = useDispatch();
    const speechId = useSelector((state) => state.flow.speechId);
    const tags = useSelector((state) => state.flow.tags);
    const cardId = crypto.randomUUID();

    const onChange = useCallback(event => {
        if (event.target.value.includes("\n")) {
            const val = event.target.value.replace("\n", "");
            if (val != "") {
                dispatch(addCardAfter({ card: val, speechId, cardId }));
                event.target.value = "";

                generateTagsFromText(val, Object.keys(tags).join(", "), cardId, dispatch);
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
    columnWidth,
    columnPadding,
    yPosition
) {
    return {
        id: crypto.randomUUID(),
        position: {
            x: columnWidth * speechId + (columnPadding * speechId + 1),
            y: yPosition
        },
        type: "textEntry",
        style: { border: "none", width: columnWidth },
    };
}
