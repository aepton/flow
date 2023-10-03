import * as React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  addCard,
  addEdge,
  addItemToTag,
  addSpeech,
  createTag,
  editSpeechTitle,
  escapeStatus,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  removeTagFromItem,
  setInstance,
  setSelectedNode,
  setSelectedTags,
  setShouldCenterOnActive,
  setSpeechNodes,
  setSpeechYPosition,
  setStatus
} from "../slices/flowSlice";

import ReactFlow, { Panel } from 'reactflow';
import {Helmet} from "react-helmet-async";

import Multiselect from "react-widgets/Multiselect";

import BasicCardNode from "../components/basicCardNode";
import ArgumentNode from "../components/argumentNode";
import HighlightedCardNode from "../components/highlightedCardNode";
import SpeechLabelNode from "../components/speechLabelNode";
import TextEntryNode from "../components/textEntryNode";

import dataUrl from '../data/37th_debate_height.json';

window.instance = {};

function debounce(func, timeout = 5){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function generateEdgeId(edge) {
  return `${edge.source} - ${edge.target}`;
}

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
  basic: BasicCardNode,
  highlighted: HighlightedCardNode,
  speechLabel: SpeechLabelNode,
  argument: ArgumentNode
};


export default function Home(props) {
  const [cardContent, setCardContent] = React.useState("");
  const [speechContent, setSpeechContent] = React.useState("");
  const cards = useSelector((state) => state.flow.cards);
  const cursorCellId = useSelector((state) => state.flow.cellId);
  const cursorSpeechId = useSelector((state) => state.flow.speechId);
  const edges = useSelector((state) => state.flow.edges);
  const meta = useSelector((state) => state.flow.meta);
  const selectedTags = useSelector((state) => state.flow.selectedTags);
  const speechYPosition = useSelector((state) => state.flow.speechYPosition);
  const shouldCenterOnActive = useSelector((state) => state.flow.shouldCenterOnActive);
  const status = useSelector((state) => state.flow.status);
  const tags = useSelector((state) => state.flow.tags);
  const title = useSelector((state) => state.flow.title);

  const dispatch = useDispatch();

  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const leftPress = useKeyPress("ArrowLeft");
  const rightPress = useKeyPress("ArrowRight");

  const tagShortcut = useKeyPress("t");

  if (downPress) {
    console.log('down');
    if (status == 'navigating' && cards.length > props.selectedCard) {
      props.setSelectedCard(props.selectedCard + 1);
    }
  } else if (upPress) {
    console.log('up');
    if (status == 'navigating' && props.selectedCard > -1) {
      props.setSelectedCard(props.selectedCard - 1);
    }
  } else if (tagShortcut) {
    console.log('whoo');
  }

  const speeches = [];
  cards.forEach((card, cardIdx) => {
    if (speeches.indexOf(card.speech) == -1) {
      speeches.push(card.speech);
    }
  });

  const columnPadding = 50;
  const columnWidth = (window.innerWidth - (columnPadding * (speeches.length - 1))) / speeches.length;

  const renderedNodes = [];
  let yPosition = 0;
  const yPadding = 5;
  const recenterPadding = 150;

  const sourceEdges = [];
  const targetEdges = [];

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
  cards.forEach((card, cardIdx) => {
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

    if (isSelectedTag) {
      const node = {
        id: cardId,
        position: { x: columnWidth * speechIdx + (columnPadding * speechIdx + 1), y: yPosition },
        data: {
          text: card.text,
          active,
          sourceHandle: true,
          targetHandle: true,
          id: card.id,
          tags: cardTags,
          allTags,
          addTag: tag => dispatch(addItemToTag({ item: clusterId, tag})),
          removeTag: tag => dispatch(removeTagFromItem({ item: clusterId, tag})),
          createTag: tag => dispatch(createTag(tag))
        },
        type: 'argument',
        style: {width: columnWidth}
      };

      if (active) {
        activeNode = node;
        yPosition += yPadding * 10;
      } else {
        renderedNodes.push(node);
      }

      if (shouldCenterOnActive && active) {
        recenterY = yPosition - recenterPadding;
      }

      yPosition += card.height + yPadding;
    }

    /*
    if (speechIdx == cursorSpeechId && cursorCellId == speech.length) {
      renderedNodes.push({
        id: "card-entry-" + speechIdx,
        position: { x: 200 * speechIdx + 37, y: 100 * (speech.length + 1.2) },
        type: 'textEntry',
        // style: { border: 'none' },
      }); 
    }
    */
  });

  if (activeNode) {
    renderedNodes.push(activeNode);
  }

  if (shouldCenterOnActive && recenterY != -1) {
    console.log('centering', recenterY);
    window.instance.setViewport({
      x: window.instance.getViewport().x,
      y: recenterY * -1,
      zoom: window.instance.getZoom()
    });
    setShouldCenterOnActive(false);
  }

  const renderedEdges = [];
  edges.forEach((edge, idx) => {
    renderedEdges.push({
      id: "edge_" + idx,
      source: edge.source,
      target: edge.target
    });
  });

  /*
  console.log(JSON.stringify(edges));
  console.log(JSON.stringify(cards));
  console.log(JSON.stringify(clusters));
  console.log(JSON.stringify(tags));
  */

  const clusterHeads = {};
  Object.keys(clusters).forEach(key => {
    if (Object.keys(clusterHeads).indexOf(clusters[key]) == -1) {
      clusterHeads[clusters[key]] = 0;
    }
    clusterHeads[clusters[key]] += 1;
  });
  
  const renderedSpeeches = [];
  /*
  speeches.forEach((speech, idx) => {
    const isEditing = idx == cursorSpeechId && cursorCellId == -1 && false;
    renderedNodes.push({
      id: "speech_" + idx,
      position: { x: columnWidth * idx + (columnPadding * idx + 1), y: speechYPosition},
      data: { label: speech, isEditing },
      type: isEditing ? 'textEntry' : 'speechLabel',
      style: { width: columnWidth },
      zIndex: -1
    });
  });
  */

  const onMove = (event, viewport) => {
    if (viewport.y > 0) {
      window.instance.setViewport({ x: viewport.x, y: 0, zoom: viewport.zoom });
    }
  }
  
  const onInit = (instance) => {
    console.log('init', speeches);
    window.instance = instance;
  
    const positionCards = [];
    instance.getNodes().forEach(node => {
      if (node.id.startsWith('card_')) {
        const speech = speeches[node.id.split('_')[1]];
        positionCards.push({ speech, text: node.data.text, height: node.height, width: node.width });
      }
    });
    // console.log(JSON.stringify(positionCards));

    speeches.forEach(speech => {
      const tag = `Winner: ${speech}`
      if (Object.keys(tags).indexOf(tag) === -1) {
        dispatch(createTag(tag));
      }
    })
  }

  const onNodeClick = (event, node) => {
    console.log(node.id);
    if (node.id !== null && node.id !== cursorCellId) {
      console.log('dispatching');
      dispatch(setSelectedNode(node.id));
    }
    if (status !== 'node') {
      dispatch(setStatus('node'));
    }
  }

  const onConnect = (event) => {
    dispatch(addEdge({ source: event.source, target: event.target }));
  }

  const onSetSelectedTags = (event) => {
    console.log(event);
    dispatch(setSelectedTags(event));
  }

  const speechNav = [];
  speeches.forEach((speech, idx) => {
    speechNav.push(
      <span
        style={{ left: columnWidth * idx + (columnPadding * idx + 1), width: columnWidth }}
        className="speechLabel"
      >
        {speech}
      </span>
    );
  });
  
  return (
    <div>
      <Helmet>
        <title>Flow: {title}</title>
      </Helmet>
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
        {speechNav}
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={renderedNodes}
          edges={renderedEdges}
          nodeTypes={nodeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          onNodeClick={onNodeClick}
          onlyRenderVisibleElements={true}
          zoomOnScroll={false}
          zoomOnDoubleClick={false}
          panOnScroll={true}
          panOnScrollMode={'vertical'}
          onMove={debounce((event, viewport) => onMove(event, viewport))}
          proOptions={{hideAttribution: true}}
        >
          <Panel position="top-left"></Panel>
        </ReactFlow>
      </div>
    </div>
  );
}
