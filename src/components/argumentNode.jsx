import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import Multiselect from "react-widgets/Multiselect";
import { Converter } from "showdown";

import { useDispatch, useSelector } from "react-redux";

import {
    editCardText,
    moveNodeSpeech,
    moveDown,
    removeCard,
    setSelectedNode,
    setStatus,
} from "../slices/flowSlice";

import leftUrl from "../../left.svg";
import minusUrl from "../../minus.svg";
import plusUrl from "../../plus.svg";
import rightUrl from "../../right.svg";
import trashUrl from "../../trash.svg";

function ArgumentNode({ data }) {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.flow.status);

    if (!window.showdown) {
        window.showdown = new Converter();
    }

    const onMultiselectChange = useCallback((value, event) => {
        if (event.action == "remove") {
            data.removeTag(event.dataItem);
        } else if (event.action == "insert") {
            data.addTag(event.dataItem);
        }
    });

    const onCreate = useCallback((tag) => {
        data.createTag(tag);
        data.addTag(tag);
    });

    const deleteNode = () => {
        dispatch(removeCard(data.id));
    };

    const addNode = () => {
        dispatch(addCardAfter(data.id));
    };

    const onClick = () => {
        dispatch(setSelectedNode(data.nodeIdx));
        dispatch(setStatus(`editing${data.id}`));
        window.status = "node";
    };

    const onTextEntryChange = (event) => {
        const text = event.nativeEvent.target.innerText;
        if (text.includes("\n")) {
            const val = text.replace("\n", "");
            if (val != "") {
                dispatch(editCardText({ id: data.id, text: val }));
                dispatch(moveDown());
            }
        }
    };

    const collapseExchange = () => {
        console.log("collapse exchange");
    };

    const moveLeft = () => {
        dispatch(moveNodeSpeech({ cardId: data.id, direction: "left" }));
    };

    const moveRight = () => {
        dispatch(moveNodeSpeech({ cardId: data.id, direction: "right" }));
    };

    const autofocusInput = useCallback((inputElement) => {
        if (inputElement) {
            setTimeout((x) => {
                const range = document.createRange();
                range.selectNodeContents(inputElement);
                range.collapse(false);

                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }, 100);
        }
    }, []);

    let className = `argument-node ${data.active ? "active-node" : ""}`;
    let handleClass =
        data.editingMode || true ? "edit-handle" : "noedit-handle";

    return (
        <div className={className}>
            <Handle type="target" position={Position.Bottom} />
            {data.sourceHandle && (
                <Handle
                    type="source"
                    className={handleClass}
                    position={Position.Bottom}
                />
            )}
            {data.editingMode && false && (
                <div>
                    <img
                        src={trashUrl}
                        className="delete-node control-node"
                        onClick={deleteNode}
                    />
                    <img
                        src={rightUrl}
                        className="move-right-node control-node"
                        onClick={moveRight}
                    />
                    <img
                        src={leftUrl}
                        className="move-left-node control-node"
                        onClick={moveLeft}
                    />
                    <img
                        src={plusUrl}
                        className="add-node control-node"
                        onClick={addNode}
                    />
                </div>
            )}
            {!data.editingMode && data.clusterHead && (
                <img
                    src={minusUrl}
                    className="collapse-exchange"
                    onClick={collapseExchange}
                />
            )}
            {status === `editing${data.id}` && (
                <div>
                    <div
                        className="text-entry-node"
                        contentEditable
                        ref={autofocusInput}
                        onClick={onClick}
                        onInput={onTextEntryChange}
                    >
                        {data.text}
                    </div>
                    <Multiselect
                        data={data.allTags}
                        placeholder="add tags"
                        allowCreate
                        autoFocus={data.editingMode}
                        onChange={onMultiselectChange}
                        value={data.tags}
                        onCreate={onCreate}
                    />
                </div>
            )}
            {(!data.active || status !== `editing${data.id}`) && (
                <div>
                    <div
                        className="argument-text"
                        dangerouslySetInnerHTML={{
                            __html: window.showdown.makeHtml(data.text),
                        }}
                        onClick={onClick}
                    />
                    {data.clusterHead && (
                        <div className="argument-tags">
                            {data.tags.join("; ")}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ArgumentNode;
