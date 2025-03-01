import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addCardAfter, addItemToTag, createTag } from "../slices/flowSlice";
import { generateTagsFromText } from "../utils/tagging";

export function TextEntryNode({ data }) {
    const dispatch = useDispatch();
    const flow = useSelector((state) => state.flow);
    const speechId = useSelector((state) => state.flow.speechId);
    const cardId = crypto.randomUUID();

    const clusters = useSelector((state) => state.flow.clusters);
    const clusterId = clusters[`card_${cardId}`];

    const onChange = useCallback(async (event) => {
        if (event.target.value.includes("\n")) {
            const val = event.target.value.replace("\n", "");
            if (val != "") {
                dispatch(addCardAfter({ card: val, speechId, cardId }));

                const tags = await generateTagsFromText(val);
                tags.forEach((tag) => {
                    dispatch(createTag({ tag }));
                    dispatch(addItemToTag({ item: clusterId, tag }));
                });

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
