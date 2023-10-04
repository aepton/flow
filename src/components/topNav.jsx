import * as React from "react";

import { useSelector, useDispatch } from "react-redux";

import Multiselect from "react-widgets/Multiselect";

import { setSelectedTags } from "../slices/flowSlice";

export default function TopNav(props) {
    const meta = useSelector((state) => state.flow.meta);
    const selectedTags = useSelector((state) => state.flow.selectedTags);
    const tags = useSelector((state) => state.flow.tags);
    const title = useSelector((state) => state.flow.title);

    const speechNav = [];
    props.speeches.forEach((speech, idx) => {
      speechNav.push(
        <span
          style={{
              left: props.columnWidth * idx + (props.columnPadding * idx + 1),
              width: props.columnWidth
          }}
          className="speechLabel"
        >
          {speech}
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
                <h2 id="debateTitle">{title}</h2>
                <span id="debateAbout" dangerouslySetInnerHTML={{__html: meta}} />
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