import * as React from "react";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    closeFlyout,
    removeEdge,
    setShouldCenterOnActive,
    setSelectedNode,
} from "./slices/flowSlice";

import { loadLocalStorage } from "./utils/storage";

import {
    ReactFlow,
    Panel,
    ConnectionMode,
    useReactFlow,
} from "@xyflow/react";

import { Helmet } from "react-helmet-async";

import { Converter } from "showdown";

import ArgumentNode from "./components/argumentNode";
import HighlightedCardNode from "./components/highlightedCardNode";
import SpeechLabelNode from "./components/speechLabelNode";
import SpeechHeaders from "./components/speechHeaders";
import { TextEntryNode } from "./components/textEntryNode";

import handleKeyPresses from "./utils/movement";

import faviconUrl from "../favicon.ico";
import { generateDimensions } from "./utils/dimensions";
import { renderCards, renderEdges } from "./utils/rendering";

import ELK from 'elkjs/lib/elk.bundled.js';

const nodeTypes = {
    textEntry: TextEntryNode,
    highlighted: HighlightedCardNode,
    speechLabel: SpeechLabelNode,
    argument: ArgumentNode,
};

export default function Flow(props) {
    const flow = useSelector((state) => state.flow);

    const {
        cards,
        editingMode,
        shouldCenterOnActive,
        speeches,
        title,
    } = flow;

    const { columnPadding, columnWidth, yPadding } = generateDimensions(speeches);

    const dispatch = useDispatch();
    const instance = useReactFlow();

    const { renderedNodes, recenterY, yPosition, dirty } = renderCards(flow, dispatch);
    const renderedEdges = renderEdges(flow, dirty, instance.getNodes, dispatch);

    const elk = new ELK();

    const layoutedNodes = elk.layout({
        nodes: renderedNodes,
        edges: renderedEdges,
        options: {
          "elk.algorithm": "layered",
          "elk.direction": "RIGHT",
          "elk.spacing.nodeNode": 50
        }
      });

    useEffect(() => {
        console.log('Component rendered', { props, flow });
      });

    handleKeyPresses();

    useEffect(() => {
        loadLocalStorage(dispatch);
        return () => {};
    }, [dispatch]);

    if (shouldCenterOnActive && recenterY != -1) {
        setShouldCenterOnActive(false);
    }

    const onInit = () => {
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
                    nodes={layoutedNodes}
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
