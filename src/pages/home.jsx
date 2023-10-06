import * as React from "react";

import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  addCard,
  addEdge,
  addItemToTag,
  addSpeech,
  closeFlyout,
  createTag,
  escapeStatus,
  moveUp,
  moveDown,
  removeTagFromItem,
  setInitialStateForRound,
  setSelectedNode,
  setShouldCenterOnActive,
  setStatus,
  setCards
} from "../slices/flowSlice";

import ReactFlow, { Panel } from 'reactflow';
import {Helmet} from "react-helmet-async";

import ArgumentNode from "../components/argumentNode";
import HighlightedCardNode from "../components/highlightedCardNode";
import SpeechLabelNode from "../components/speechLabelNode";
import TextEntryNode from "../components/textEntryNode";
import TopNav from "../components/topNav";

import dataLoader from "../components/dataLoader";

import faviconUrl from "../../favicon.ico";

window.instance = {};

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = React.useState(false);
  const dispatch = useDispatch();

  function moveHandler({ key }) {
    if (key === targetKey) {
      if (targetKey === "ArrowDown") {
        dispatch(moveDown());
      } else if (targetKey === "ArrowUp") {
        dispatch(moveUp());
      } else if (targetKey === "t") {
        console.log('tagging');
        dispatch(setStatus('tagging'));
      } else if (targetKey === "Escape") {
        dispatch(escapeStatus());
      }
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", moveHandler);
    return () => {
      window.removeEventListener("keydown", moveHandler);
    };
  }, []);

  return keyPressed;
}

function handleCardContentsEdit(event) {
  const dispatch = useDispatch();

  if (event.target.value.includes("\n")) {
    const val = event.target.value.replace("\n", "");
    if (val != "") {
      dispatch(addCard({card: val, speechId: 0}));
    }
    setCardContent("");
  } else {
    setCardContent(event.target.value);
  }
};

function handleSpeechContentsEdit(event) {
  const dispatch = useDispatch();

  if (event.target.value.includes("\n")) {
    const val = event.target.value.replace("\n", "");
    if (val != "") {
      dispatch(addSpeech(val));
    }
    setSpeechContent("");
  } else {
    setSpeechContent(event.target.value);
  }
};

function onEdgesChange(event) {
  addEdge();
};

const nodeTypes = {
  textEntry: TextEntryNode,
  highlighted: HighlightedCardNode,
  speechLabel: SpeechLabelNode,
  argument: ArgumentNode
};

export default function Home(props) {
  const cards = useSelector((state) => state.flow.cards);
  const cursorCellId = useSelector((state) => state.flow.cellId);
  const edges = useSelector((state) => state.flow.edges);
  const editingMode = useSelector((state) => state.flow.editingMode);
  const selectedTags = useSelector((state) => state.flow.selectedTags);
  const shouldCenterOnActive = useSelector((state) => state.flow.shouldCenterOnActive);
  const status = useSelector((state) => state.flow.status);
  const tags = useSelector((state) => state.flow.tags);
  const title = useSelector((state) => state.flow.title);

  const dispatch = useDispatch();

  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const tagShortcut = useKeyPress("t");

  if (downPress) {
    if (status == 'navigating' && cards.length > props.selectedCard) {
      props.setSelectedCard(props.selectedCard + 1);
    }
  } else if (upPress) {
    if (status == 'navigating' && props.selectedCard > -1) {
      props.setSelectedCard(props.selectedCard - 1);
    }
  } else if (tagShortcut) {
    console.log('tagging shortcut');
  }

  useEffect(() => {
    dataLoader(round => dispatch(setInitialStateForRound(round)));
    return () => {};
  }, [dispatch]);

  const speeches = [];
  if (cards.forEach) {
    cards.forEach((card, cardIdx) => {
      if (speeches.indexOf(card.speech) == -1) {
        speeches.push(card.speech);
      }
    });
  }

  const columnPadding = 50;
  const columnWidth = (window.innerWidth - (columnPadding * (speeches.length - 1))) / speeches.length;

  const renderedNodes = [];
  let yPosition = 0;
  const yPadding = 30;
  const recenterPadding = 150;

  const clusters = {};
  edges.forEach(edge => {
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
    cards.forEach((card) => {
      const speechIdx = speeches.indexOf(card.speech);
      const cardId = `card_${card.id}`;
  
      const clusterId = clusters[cardId];
  
      const active = cursorCellId == cardId;
  
      const cardTags = [];
      allTags.forEach(key => {
        if (tags[key].indexOf(clusterId) != -1) {
          cardTags.push(key);
        }
      });

      let isSelectedTag = false;
      if (selectedTags.length === 0) {
        isSelectedTag = true;
      } else {
        isSelectedTag = true;
        selectedTags.forEach(tag => {
          if (tags[tag].indexOf(clusterId) === -1) {
            isSelectedTag = false;
          }
        });
      }

      const visible = Object.keys(card).indexOf('height') !== -1;
      if (!visible) {
        dirty = true;
      }
  
      if (isSelectedTag) {
        const node = {
          id: cardId,
          position: { x: columnWidth * speechIdx + (columnPadding * speechIdx + 1), y: yPosition },
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
            addTag: tag => dispatch(addItemToTag({ item: clusterId, tag})),
            removeTag: tag => dispatch(removeTagFromItem({ item: clusterId, tag})),
            createTag: tag => dispatch(createTag(tag))
          },
          selectable: editingMode,
          type: 'argument',
          style: {width: columnWidth, opacity: visible ? 1 : 0}
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
        renderedNodes.push({
          id: "card-entry-" + speechIdx,
          position: { x: 200 * speechIdx + 37, y: 100 * (cards.length + 1.2) },
          type: 'textEntry',
          style: { border: 'none' },
        }); 
      }
    });
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
      const positionCards = [];
      instance.getNodes().forEach(node => {
        if (node.id.startsWith('card_')) {
          positionCards.push({
            speech: node.data.speech,
            text: node.data.text,
            id: node.data.id,
            height: node.height,
            width: node.width
          });
        }
      });
      dispatch(setCards(positionCards));
    }, 500);
  } else {
    edges.forEach((edge, idx) => {
      renderedEdges.push({
        id: "edge_" + idx,
        source: edge.source,
        target: edge.target
      });
    });
  }

  const clusterHeads = {};
  Object.keys(clusters).forEach(key => {
    if (Object.keys(clusterHeads).indexOf(clusters[key]) == -1) {
      clusterHeads[clusters[key]] = 0;
    }
    clusterHeads[clusters[key]] += 1;
  });
  
  const onInit = (instance) => {
    window.instance = instance;
  }

  const onNodeClick = (event, node) => {
    if (!editingMode) {
      return;
    }
    if (node.id !== null && node.id !== cursorCellId) {
      dispatch(setSelectedNode(node.id));
    }
    if (status !== 'node') {
      dispatch(setStatus('node'));
    }
  }

  const onConnect = (event) => {
    dispatch(addEdge({ source: event.source, target: event.target }));
  }

  const closeFlyoutEvent = () => {
    dispatch(closeFlyout());
  }
  
  return (
    <div>
      <Helmet>
        <title>Flow: {title}</title>
        <link rel="icon" href={faviconUrl} />
      </Helmet>
      <TopNav speeches={speeches} columnWidth={columnWidth} columnPadding={columnPadding} />
      <div style={{ width: "100vw", height: `${yPosition}px`, paddingTop: '1rem' }}>
        <ReactFlow
          nodes={renderedNodes}
          edges={renderedEdges}
          nodeTypes={nodeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          onNodeClick={onNodeClick}
          onlyRenderVisibleElements={false}
          preventScrolling={false}
          zoomOnScroll={false}
          zoomOnDoubleClick={false}
          panOnScroll={false}
          panOnScrollMode={'vertical'}
          proOptions={{hideAttribution: true}}
          panOnDrag={false}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          onClick={closeFlyoutEvent}
        >
          <Panel position="top-left"></Panel>
        </ReactFlow>
      </div>
    </div>
  );
}
