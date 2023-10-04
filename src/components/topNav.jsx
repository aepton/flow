import * as React from "react";

import { useSelector, useDispatch } from "react-redux";

import Multiselect from "react-widgets/Multiselect";

import { setSelectedTags } from "../slices/flowSlice";

export default function TopNav(props) {
    const date = useSelector((state) => state.flow.date);
    const moderators = useSelector((state) => state.flow.moderators);
    const selectedTags = useSelector((state) => state.flow.selectedTags);
    const source = useSelector((state) => state.flow.source);
    const tags = useSelector((state) => state.flow.tags);
    const title = useSelector((state) => state.flow.title);
    const url = useSelector((state) => state.flow.url);

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

    const allTags = Object.keys(tags);

    const onSetSelectedTags = (event) => {
        console.log(event);
        dispatch(setSelectedTags(event));
      }

    return (
        <div id="speakers">
            <div id="header">
                <span id="debateTitle">{title}&nbsp;&nbsp;&nbsp;<a href={url} id="source-tag">({source}, {date})</a></span>
                <span id="tagSelect">
                    <Multiselect
                        data={allTags}
                        placeholder="filter tags"
                        value={selectedTags}
                        onChange={onSetSelectedTags}
                    />
                </span>
            </div>
            <div id="speeches">
                {speechNav}
            </div>
        </div>
    );
}