import * as React from "react";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addEdge,
    closeFlyout,
    removeEdge,
    setShouldCenterOnActive,
    setSelectedNode
} from "./slices/flowSlice";

import { loadLocalStorage } from "./utils/storage";

import { ReactFlow, Panel, ConnectionMode } from "@xyflow/react";

import { Helmet } from "react-helmet-async";

import { Converter } from "showdown";

import ArgumentNode from "./components/argumentNode";
import HighlightedCardNode from "./components/highlightedCardNode";
import SpeechLabelNode from "./components/speechLabelNode";
import SpeechHeaders from "./components/speechHeaders";
import { TextEntryNode } from "./components/textEntryNode";
import TopNav from "./components/topNav";

import handleKeyPresses from "./utils/movement";

import faviconUrl from "../favicon.ico";
import { generateDimensions } from "./utils/dimensions";
import { renderCards, renderEdges } from "./utils/rendering";

window.instance = {};
window.shiftPressed = null;

const nodeTypes = {
    textEntry: TextEntryNode,
    highlighted: HighlightedCardNode,
    speechLabel: SpeechLabelNode,
    argument: ArgumentNode,
};

export default function Flow(props) {
    const cards = useSelector((state) => state.flow.cards);
    const editingMode = useSelector((state) => state.flow.editingMode);
    
    const shouldCenterOnActive = useSelector(
        (state) => state.flow.shouldCenterOnActive
    );
    const speeches = useSelector((state) => state.flow.speeches);

    const title = useSelector((state) => state.flow.title);

    const dispatch = useDispatch();

    handleKeyPresses();

    useEffect(() => {
        loadLocalStorage(dispatch);
        return () => {};
    }, [dispatch]);

    const { columnWidth, columnPadding, yPadding, recenterPadding } =
        generateDimensions(speeches);

    const { renderedNodes, dirty, yPosition, recenterY } = renderCards(
        columnWidth,
        columnPadding,
        yPadding,
        recenterPadding,
        shouldCenterOnActive
    );

    if (shouldCenterOnActive && recenterY != -1) {
        setShouldCenterOnActive(false);
    }

    const renderedEdges = renderEdges(dirty);

    const onInit = (instance) => {
        window.instance = instance;

        if (!window.showdown) {
            window.showdown = new Converter();
        }
    };

    const onNodeClick = (event, node, cards) => {
        let nodeIdx = -1;
        cards.forEach((speech) => {
            speech.forEach((card, cardIdx) => {
                const tempId = `card_${card.id}`;
                if (tempId === node.id) {
                    nodeIdx = cardIdx;
                }
            });
        });
        dispatch(setSelectedNode(nodeIdx));
    };

    const onEdgeClick = (event, edge) => {
        if (editingMode) {
            dispatch(removeEdge(edge));
        }
    };

    const closeFlyoutEvent = () => {
        dispatch(closeFlyout());
    };

    const defaultEdgeOptions = {
        // Reduce the scroll speed during edge creation
        connectionMode: "loose",
        autoPanOnConnect: false,
        autoPanOnConnectSpeed: 0.5, // Default is 1, lower numbers = slower scroll
        autoPanOnConnectDistance: 50, // Distance from edge before auto-pan starts
    };

    return (
        <div>
            <Helmet>
                <title>Flow: {title}</title>
                <link rel="icon" href={faviconUrl} />
            </Helmet>
            <TopNav debug={props.debug} />
            <SpeechHeaders
                columnWidth={columnWidth}
                columnPadding={columnPadding}
            />
            <div
                id="flowCanvas"
                style={{
                    width: `${columnWidth * speeches.length}px`,
                    height: `${Math.max(500, yPosition + 2 * yPadding)}px`,
                }}
            >
                    <ReactFlow
                        nodes={renderedNodes}
                        edges={renderedEdges}
                        nodeTypes={nodeTypes}
                        onInit={onInit}
                        onNodeClick={(event, node) =>
                            onNodeClick(event, node, cards)
                        }
                        onEdgeClick={onEdgeClick}
                        onlyRenderVisibleElements={false}
                        preventScrolling={false}
                        zoomOnScroll={false}
                        zoomOnDoubleClick={false}
                        panOnScroll={false}
                        panOnScrollMode={"vertical"}
                        proOptions={{ hideAttribution: true }}
                        panOnDrag={false}
                        nodesDraggable={false}
                        nodesConnectable={false}
                        nodesFocusable={editingMode}
                        onClick={closeFlyoutEvent}
                        defaultEdgeOptions={defaultEdgeOptions}
                        connectionMode={ConnectionMode.Loose}
                    >
                        <Panel position="top-left"></Panel>
                    </ReactFlow>
            </div>
        </div>
    );
}
