import * as React from "react";

import { useSelector, useDispatch } from "react-redux";

import { closeFlyout, setSpeeches } from "../slices/flowSlice";

export default function SpeechHeaders(props) {
    const editing = useSelector((state) => state.flow.editingMode);
    const moderators = useSelector((state) => state.flow.moderators);
    const speeches = useSelector((state) => state.flow.speeches) || [];

    const dispatch = useDispatch();

    const closeFlyoutEvent = () => {
        dispatch(closeFlyout());
    }

    const setStatus = () => {
        window.status = 'speech-label';
    }

    const moderatorTag = ' (moderator)';

    const setHeaders = evt => {
        if (window.status === 'speech-label' && evt.code === 'Enter') {
            evt.stopPropagation();
            evt.preventDefault();

            const speeches = [];
            Array.from(document.getElementsByClassName('speechLabel')).forEach(speech => {
              speeches.push({
                label: speech.innerText.replace(
                    '<br>', ''
                ).replace(/[\n\r]+/g, '').replace(moderatorTag, '').trim(),
                id: speech.getAttribute('data-speechid')
              });
            });
            dispatch(setSpeeches(speeches));
        }
    }

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
                onClick={setStatus}
                onKeyDown={setHeaders}
            >
                {speech.label}{moderators.indexOf(speech.id) !== -1 ? moderatorTag : ''}
            </span>
        );
    });

    const width = speeches.length * (props.columnWidth + props.columnPadding);

    return (
        <div id="speeches" style={{ width: `${width}px` }} onClick={closeFlyoutEvent}>
            {speechNav}
        </div>
    );

}