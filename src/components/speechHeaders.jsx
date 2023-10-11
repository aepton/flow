import * as React from "react";

import { useSelector, useDispatch } from "react-redux";

import { closeFlyout } from "../slices/flowSlice";

export default function SpeechHeaders(props) {
    const moderators = useSelector((state) => state.flow.moderators);

    const speechNav = [];
    props.speeches.forEach((speech, idx) => {
        speechNav.push(
            <span
                style={{
                    left: props.columnWidth * idx + (props.columnPadding * idx + 1),
                    width: props.columnWidth
                }}
                className={`speechLabel ${moderators.indexOf(speech) !== -1 ? 'moderatorSpeech' : ''}`}
            >
            {speech}{moderators.indexOf(speech) !== -1 ? ' (moderator)' : ''}
        </span>
    );
    });

    const dispatch = useDispatch();

    const closeFlyoutEvent = () => {
        dispatch(closeFlyout());
    }

    return (
        <div id="speeches" onClick={closeFlyoutEvent}>
            {speechNav}
        </div>
    );

}