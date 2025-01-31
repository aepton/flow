import * as React from "react";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addEdge,
  addItemToTag,
  closeFlyout,
  createTag,
  removeEdge,
  removeTagFromItem,
  setInitialStateForRound,
  setShouldCenterOnActive,
  setCardHeightWidth,
} from "../slices/flowSlice";

import ReactFlow, { Panel } from "reactflow";
import { Helmet } from "react-helmet-async";

import { Converter } from "showdown";

import ArgumentNode from "../components/argumentNode";
import HighlightedCardNode from "../components/highlightedCardNode";
import SpeechLabelNode from "../components/speechLabelNode";
import SpeechHeaders from "../components/speechHeaders";
import TextEntryNode from "../components/textEntryNode";
import TopNav from "../components/topNav";

import useKeyPress from "../utils/movement";

import dataLoader from "../components/dataLoader";

import faviconUrl from "../../favicon.ico";

window.instance = {};

function onEdgesChange(event) {
  addEdge();
}

const nodeTypes = {
  textEntry: TextEntryNode,
  highlighted: HighlightedCardNode,
  speechLabel: SpeechLabelNode,
  argument: ArgumentNode,
};

export default function Home(props) {
  const cards = useSelector((state) => state.flow.cards);
  const cursorCellId = useSelector((state) => state.flow.cellId);
  const edges = useSelector((state) => state.flow.edges);
  const editingMode = useSelector((state) => state.flow.editingMode);
  const selectedTags = useSelector((state) => state.flow.selectedTags);
  const shouldCenterOnActive = useSelector(
    (state) => state.flow.shouldCenterOnActive,
  );
  const speechSettings = useSelector((state) => state.flow.speeches);
  const status = useSelector((state) => state.flow.status);
  const tags = useSelector((state) => state.flow.tags);
  const title = useSelector((state) => state.flow.title);

  console.log(
    Date.now() / 1000,
    "cards",
    cards,
    "cursorCellId",
    cursorCellId,
    "edges",
    edges,
    "editingMode",
    editingMode,
    "selectedTags",
    selectedTags,
    "shouldCenterOnActive",
    shouldCenterOnActive,
    "speechSettings",
    speechSettings,
    "status",
    status,
    "tags",
    tags,
    "title",
    title,
  );

  const dispatch = useDispatch();

  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const leftPress = useKeyPress("ArrowLeft");
  const rightPress = useKeyPress("ArrowRight");
  const enterPress = useKeyPress("Enter");
  const tagShortcut = useKeyPress("t");

  if (downPress) {
    console.log("down");
    if (status == "navigating" && cards.length > props.selectedCard) {
      props.setSelectedCard(props.selectedCard + 1);
    }
  } else if (upPress) {
    console.log("up");
    if (status == "navigating" && props.selectedCard > -1) {
      props.setSelectedCard(props.selectedCard - 1);
    }
  } else if (leftPress) {
    console.log("left press!");
  } else if (rightPress) {
    console.log("right press!");
  } else if (tagShortcut) {
    console.log("tag");
  } else if (enterPress) {
    console.log("enter");
  }

  useEffect(() => {
    dataLoader(props.round, (round) =>
      dispatch(setInitialStateForRound(round)),
    );
    return () => {};
  }, [dispatch]);

  const speeches = [];
  if (cards.map) {
    cards.map((card) => {
      if (speeches.indexOf(card.speech) == -1) {
        speeches.push(card.speech);
      }
    });
  }

  if (speeches.length === 0) {
    speeches.push(0);
  }

  const columnPadding = 50;
  const windowWidth = window.innerWidth - 10;
  const columnWidth = Math.max(
    (windowWidth - columnPadding * (speeches.length - 1)) / speeches.length,
    windowWidth / 2.5,
  );
  const renderedNodes = [];
  let yPosition = 0;
  const yPadding = 30;
  const recenterPadding = 150;

  const clusters = {};
  edges.forEach((edge) => {
    if (Object.keys(clusters).indexOf(edge.source) == -1) {
      clusters[edge.source] = edge.source;
      clusters[edge.target] = edge.source;
    } else {
      clusters[edge.target] = clusters[edge.source];
    }
  });

  let recenterY = -1;
  let activeNode = null;
  const allTags = Object.keys(tags);
  let dirty = false;
  if (cards.forEach) {
    const generateEntryNode = (speechId, cardsLength) => ({
      id: "card-entry-" + speechId,
      position: { x: 200 * speechId + 10, y: 100 * (cardsLength + 1.2) },
      type: "textEntry",
      style: { border: "none", width: columnWidth },
    });

    cards.forEach((card, idx) => {
      const speechIdx = speeches.indexOf(card.speech);
      const cardId = `card_${card.id}`;

      const clusterId = clusters[cardId];

      const active = cursorCellId == idx;

      const visible = Object.keys(card).indexOf("height") !== -1;
      if (!visible) {
        dirty = true;
      }

      const cardTags = [];
      allTags.forEach((key) => {
        if (tags[key].indexOf(clusterId) != -1) {
          cardTags.push(key);
        }
      });

      let isSelectedTag = false;
      if (selectedTags.length === 0) {
        isSelectedTag = true;
      } else {
        isSelectedTag = true;
        selectedTags.forEach((tag) => {
          if (tags[tag].indexOf(clusterId) === -1) {
            isSelectedTag = false;
          }
        });
      }

      if (isSelectedTag) {
        const node = {
          id: cardId,
          position: {
            x: columnWidth * speechIdx + (columnPadding * speechIdx + 1),
            y: yPosition,
          },
          data: {
            text: card.text,
            active,
            editingMode,
            sourceHandle: true,
            targetHandle: true,
            id: card.id,
            tags: cardTags,
            allTags,
            speech: card.speech,
            clusterHead: clusters[cardId] === cardId,
            addTag: (tag) => dispatch(addItemToTag({ item: clusterId, tag })),
            removeTag: (tag) =>
              dispatch(removeTagFromItem({ item: clusterId, tag })),
            createTag: (tag) => dispatch(createTag(tag)),
            nodeIdx: idx,
          },
          selectable: editingMode,
          type: "argument",
          style: { width: columnWidth, opacity: visible ? 1 : 0 },
        };

        if (active) {
          activeNode = node;
          yPosition += yPadding * 2;
        } else {
          renderedNodes.push(node);
        }

        if (shouldCenterOnActive && active) {
          recenterY = yPosition - recenterPadding;
        }

        yPosition += (card.height || 0) + yPadding;
      }

      if (editingMode && cursorCellId == cards.length) {
        renderedNodes.push(generateEntryNode(speechIdx, cards.length));
      }
    });

    if (cards.length === 0) {
      renderedNodes.push(generateEntryNode(0, 0));
    }
  }

  if (activeNode) {
    renderedNodes.push(activeNode);
  }

  if (shouldCenterOnActive && recenterY != -1) {
    setShouldCenterOnActive(false);
  }

  const renderedEdges = [];
  if (dirty) {
    console.log(Date.now() / 1000, "dirty, setting timeout");
    setTimeout(() => {
      const info = {};
      instance.getNodes().forEach((node) => {
        if (node.id.startsWith("card_")) {
          info[node.id] = { height: node.height, width: node.width };
        }
      });
      dispatch(setCardHeightWidth(info));
    }, 50);
  } else {
    edges.forEach((edge, idx) => {
      renderedEdges.push({
        id: "edge_" + idx,
        source: edge.source,
        target: edge.target,
      });
    });
  }

  const clusterHeads = {};
  Object.keys(clusters).forEach((key) => {
    if (Object.keys(clusterHeads).indexOf(clusters[key]) == -1) {
      clusterHeads[clusters[key]] = 0;
    }
    clusterHeads[clusters[key]] += 1;
  });

  const onInit = (instance) => {
    window.instance = instance;

    window.showdown = new Converter();

    window.status = "navigating";
  };

  const onNodeClick = (event, node) => {
    let nodeIdx = -1;
    cards.forEach((card, cardIdx) => {
      const tempId = `card_${card.id}`;
      if (tempId === node.id) {
        nodeIdx = cardIdx;
      }
    });

    /*
    if (nodeIdx !== -1 && nodeIdx !== cursorCellId) {
      dispatch(setSelectedNode(nodeIdx));
    }
    if (status !== 'node') {
      dispatch(setStatus('node'));
    }
    */
  };

  const onEdgeClick = (event, edge) => {
    if (editingMode) {
      dispatch(removeEdge(edge));
    }
  };

  const onConnect = (event) => {
    dispatch(addEdge({ source: event.source, target: event.target }));
  };

  const closeFlyoutEvent = () => {
    dispatch(closeFlyout());
  };

  return (
    <div>
      <Helmet>
        <title>Flow: {title}</title>
        <link rel="icon" href={faviconUrl} />
      </Helmet>
      <TopNav />
      <SpeechHeaders columnWidth={columnWidth} columnPadding={columnPadding} />
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
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          onNodeClick={onNodeClick}
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
          nodesConnectable={editingMode}
          nodesFocusable={editingMode}
          onClick={closeFlyoutEvent}
        >
          <Panel position="top-left"></Panel>
        </ReactFlow>
        <div id="navHelp">↑/↓ navigate</div>
      </div>
    </div>
  );
}
