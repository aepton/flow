import * as React from "react";

import { useSelector, useDispatch } from "react-redux";

import Multiselect from "react-widgets/Multiselect";
import Toggle from 'react-toggle';

import { closeFlyout, toggleFlyoutOpen, toggleEditingMode, setSelectedTags } from "../slices/flowSlice";

import Flyout from "./flyout";

import logoUrl from "../../logo.png";
import pencilUrl from "../../pencil.svg";

export default function TopNav(props) {
    const date = useSelector((state) => state.flow.date);
    const editingMode = useSelector((state) => state.flow.editingMode);
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

    const toggleFlyout = () => {
        dispatch(toggleFlyoutOpen());
    }

    const toggleEditing = () => {
        dispatch(toggleEditingMode());
    }

    const closeFlyoutEvent = () => {
        dispatch(closeFlyout());
    }

    return (
        <div id="speakers" className={`${editingMode ? 'editing' : ''}`}>
            <Flyout />
            <div id="nonFlyout">
                <div id="header">
                    <img src={logoUrl} id="logo" onClick={toggleFlyout} />
                    <div id="debateTitleParent" onClick={closeFlyoutEvent}>
                        <div id="debateTitle">
                            <span>{title}</span><br />
                            <a href={url} id="source-tag">{source}, {date}</a>
                        </div>
                    </div>
                    <div id="editToggle" onClick={closeFlyoutEvent}>
                        <label>
                            <Toggle
                                defaultChecked={editingMode}
                                icons={{
                                    checked: <img src={pencilUrl} className="toggleIcon" />,
                                    unchecked: <img src={pencilUrl} className="toggleIcon" />,
                                }}
                                onChange={toggleEditing}
                            />
                        </label>
                    </div>
                    <div id="tagSelect" onClick={closeFlyoutEvent}>
                        <Multiselect
                            data={allTags}
                            placeholder="filter tags"
                            value={selectedTags}
                            onChange={onSetSelectedTags}
                        />
                    </div>
                </div>
                <div id="speeches" onClick={closeFlyoutEvent}>
                    {speechNav}
                </div>
            </div>
        </div>
    );
}