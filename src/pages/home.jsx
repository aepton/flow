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
// import { useReactFlow } from "reactflow";
import { Helmet } from "react-helmet-async";

import { Converter } from "showdown";

import ArgumentNode from "../components/argumentNode";
import HighlightedCardNode from "../components/highlightedCardNode";
import SpeechLabelNode from "../components/speechLabelNode";
import SpeechHeaders from "../components/speechHeaders";
import TextEntryNode from "../components/textEntryNode";
import TopNav from "../components/topNav";

import handleKeyPresses from "../utils/movement";

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
  const cellId = useSelector((state) => state.flow.cellId);
  const speechId = useSelector((state) => state.flow.speechId);
  const edges = useSelector((state) => state.flow.edges);
  const editingMode = useSelector((state) => state.flow.editingMode);
  const selectedTags = useSelector((state) => state.flow.selectedTags);
  /* const shouldCenterOnActive = useSelector(
    (state) => state.flow.shouldCenterOnActive,
  );*/
  const shouldCenterOnActive = true;
  const speeches = useSelector((state) => state.flow.speeches);
  const status = useSelector((state) => state.flow.status);
  const tags = useSelector((state) => state.flow.tags);
  const title = useSelector((state) => state.flow.title);

  // const { setCenter, getNode } = useReactFlow();

  const dispatch = useDispatch();

  handleKeyPresses();

  useEffect(() => {
    dataLoader(props.round, (round) =>
      dispatch(setInitialStateForRound(round)),
    );
    return () => {};
  }, [dispatch]);

  const columnPadding = 50;
  const windowWidth = window.innerWidth - 10;
  const columnWidth = Math.min(
    (windowWidth - columnPadding * (speeches.length - 1)) / speeches.length,
    200,
  );
  const renderedNodes = [];
  let yPosition = 0;
  const yPadding = 30;
  const recenterPadding = window.innerHeight / 1;
  console.log(recenterPadding);
  

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
      position: {
        x: columnWidth * speechId + (columnPadding * speechId + 1),
        y: 100 * (cardsLength + 1.2)
      },
      type: "textEntry",
      style: { border: "none", width: columnWidth },
    });

    cards.forEach((speechCards, speechCardIdx) => {
      yPosition = 0;
      speechCards.forEach((card, cardIdx) => {
        const cardId = `card_${card.id}`;
  
        const clusterId = clusters[cardId];
  
        const active = cellId === cardIdx && speechId === speechCardIdx;
  
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
              x: columnWidth * speechCardIdx + (columnPadding * speechCardIdx + 1),
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
              nodeIdx: cardIdx,
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
            /* setCenter(
              node.position.x + node.width / 2,
              node.position.y + node.height / 2,
              // { zoom: 1.5, duration: 800 }  // smooth animation
            );
            */
          }
  
          yPosition += (card.height || 0) + yPadding;
        }
  
        if (editingMode && cellId == cards[speechCardIdx].length && speechId == speechCardIdx) {
          renderedNodes.push(generateEntryNode(speechCardIdx, cards[speechCardIdx].length));
        }
      });

      if (editingMode && speechId == speechCardIdx && cards[speechCardIdx].length === 0) {
        renderedNodes.push(generateEntryNode(speechCardIdx, 0));
      }

    });

    if (cards[0].length === 0) {
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
    if (nodeIdx !== -1 && nodeIdx !== cellId) {
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

  const defaultEdgeOptions = {
    // Reduce the scroll speed during edge creation
    connectionMode: 'loose',
    autoPanOnConnect: false,
    autoPanOnConnectSpeed: 0.5, // Default is 1, lower numbers = slower scroll
    autoPanOnConnectDistance: 50 // Distance from edge before auto-pan starts
  };

  const colors = [
    '#ff9ecd',  // muted pink
    '#98e0e8',  // soft cyan
    '#a6e8b0',  // pale mint
    '#c5a3e8',  // dusty lavender
    '#ffb5a3',  // peachy coral
    '#8eb5ff',  // powder blue
    '#ffe5a3',  // pale yellow
    '#ffcce6',  // baby pink
    '#a3e8d5',  // soft teal
    '#ff9eb2'   // faded rose
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.documentElement.style.setProperty('--fun-color', randomColor);

  return (
    <div>
      <Helmet>
        <title>Flow: {title}</title>
        <link rel="icon" href={faviconUrl} />
      </Helmet>
      <TopNav debug={props.debug} />
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
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <Panel position="top-left"></Panel>
        </ReactFlow>
      </div>
    </div>
  );
}
