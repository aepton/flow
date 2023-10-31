import * as React from "react";

import { useSelector, useDispatch } from "react-redux";

import { closeFlyout } from "../slices/flowSlice";

export default function SpeechHeaders(props) {
    const editing = useSelector((state) => state.flow.editingMode);
    const moderators = useSelector((state) => state.flow.moderators);
    const speeches = useSelector((state) => state.flow.speeches);

    const speechNav = [];
    speeches.forEach((speech, idx) => {
        speechNav.push(
            <span
                style={{
                    left: props.columnWidth * idx + (props.columnPadding * idx + 1),
                    width: props.columnWidth
                }}
                className={`speechLabel ${moderators.indexOf(speech.id) !== -1 ? 'moderatorSpeech' : ''}`}
                contentEditable={editing}
                data-speechId={speech.id}
            >
            {speech.label}{moderators.indexOf(speech.id) !== -1 ? ' (moderator)' : ''}
        </span>
    );
    });

    const dispatch = useDispatch();

    const closeFlyoutEvent = () => {
        dispatch(closeFlyout());
    }

    const width = speeches.length * (props.columnWidth + props.columnPadding);

    return (
        <div id="speeches" style={{ width: `${width}px` }} onClick={closeFlyoutEvent}>
            {speechNav}
        </div>
    );

}