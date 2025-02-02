import * as React from "react";

import { useSelector, useDispatch } from "react-redux";

import Multiselect from "react-widgets/Multiselect";
import Toggle from "react-toggle";

import {
  closeFlyout,
  toggleFlyoutOpen,
  toggleEditingMode,
  setSelectedTags,
  setInitialStateForRound,
} from "../slices/flowSlice";

import downloadUrl from "../../download.svg";

export default function TopNav() {
  const flow = useSelector((state) => state.flow);
  const date = useSelector((state) => state.flow.date);
  const editingMode = useSelector((state) => state.flow.editingMode);
  const selectedTags = useSelector((state) => state.flow.selectedTags);
  const source = useSelector((state) => state.flow.source);
  const tags = useSelector((state) => state.flow.tags);
  const title = useSelector((state) => state.flow.title);
  const url = useSelector((state) => state.flow.url);

  const dispatch = useDispatch();

  const allTags = Object.keys(tags);

  const onSetSelectedTags = (event) => {
    console.log(event);
    dispatch(setSelectedTags(event));
  };

  const toggleFlyout = () => {
    dispatch(toggleFlyoutOpen());
  };

  const toggleEditing = () => {
    dispatch(toggleEditingMode());
  };

  const closeFlyoutEvent = () => {
    dispatch(closeFlyout());
  };

  const downloadHandler = () => {
    const blob = new Blob([JSON.stringify(flow)], { type: "text/json" });
    const jsonObjectUrl = URL.createObjectURL(blob);
    const filename = "round.json";
    const anchorEl = document.createElement("a");
    anchorEl.href = jsonObjectUrl;
    anchorEl.download = filename;
    anchorEl.click();
  };

  const uploadHandler = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const text = await file.text();
      dispatch(setInitialStateForRound(JSON.parse(text)));
    } catch (err) {
      console.log('Failed to parse JSON file. Please ensure the file contains valid JSON.', err);
    }
  };

  return (
    <div>
      <div id="speakers" className={`${editingMode ? "editing" : ""}`}>
        <div id="nonFlyout">
          <div id="header">
            <div id="debateTitleParent">
              <div id="debateTitle">
                {title &&
                  <span>{title}</span>
                }
                {(source || date) &&
                  <div>
                    <br />
                    <a href={url} id="source-tag">
                      {source}, {date}
                    </a>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="navParent">
        <img
          src={downloadUrl}
          id="download"
          onClick={downloadHandler}
        />
        <label id="upload-label">
          <img src={downloadUrl} />
          <input
            type="file"
            id="upload"
            accept="application/json"
            onChange={uploadHandler}
          />
        </label>
        <Multiselect
          data={allTags}
          placeholder="filter tags"
          value={selectedTags}
          onChange={onSetSelectedTags}
        />
      </div>
    </div>
  );
}
