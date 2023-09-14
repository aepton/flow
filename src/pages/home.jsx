import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { useSelector, useDispatch } from "react-redux";
import {
  addCard,
  addEdge,
  addSpeech,
  moveUp,
  moveDown,
  moveLeft,
  moveRight
} from "../slices/flowSlice";

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Panel
} from 'reactflow';

import BasicCardNode from "../components/basicCardNode";
import HighlightedCardNode from "../components/highlightedCardNode";
import SpeechLabelNode from "../components/speechLabelNode";
import TextEntryNode from "../components/textEntryNode";

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = React.useState(false);
  const dispatch = useDispatch();

  function moveHandler({ key }) {
    if (key === targetKey) {
      console.log(targetKey, "down");
      if (targetKey === "ArrowDown") {
        dispatch(moveDown());
      } else if (targetKey === "ArrowUp") {
        dispatch(moveUp());
      } else if (targetKey === "ArrowLeft") {
        dispatch(moveLeft());
      } else if (targetKey === "ArrowRight") {
        dispatch(moveRight());
      }
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", moveHandler);
    return () => {
      window.removeEventListener("keydown", moveHandler);
    };
  }, []);

  console.log(keyPressed, targetKey);
  return keyPressed;
}

export default function Home(props) {
  const [cardContent, setCardContent] = React.useState("");
  const [speechContent, setSpeechContent] = React.useState("");
  const cards = useSelector((state) => state.flow.cards);
  const cursorCellId = useSelector((state) => state.flow.cellId);
  const cursorSpeechId = useSelector((state) => state.flow.speechId);
  const edges = useSelector((state) => state.flow.edges);
  const speeches = useSelector((state) => state.flow.speeches);
  const dispatch = useDispatch();
  
  console.log(props);
  console.log(speeches);

  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const leftPress = useKeyPress("ArrowLeft");
  const rightPress = useKeyPress("ArrowRight");

  if (downPress) {
    if (cards.length > props.selectedCard) {
      props.setSelectedCard(props.selectedCard + 1);
      console.log("setting");
    }
  } else if (upPress) {
    if (props.selectedCard > 0) {
      props.setSelectedCard(props.selectedCard - 1);
    }
  }

  const handleCardContentsEdit = (event) => {
    if (event.target.value.includes("\n")) {
      const val = event.target.value.replace("\n", "");
      if (val != "") {
        console.log("adding", val);
        dispatch(addCard({card: val, speechId: 0}));
      }
      setCardContent("");
    } else {
      setCardContent(event.target.value);
    }
  };

  const handleSpeechContentsEdit = (event) => {
    console.log("event", event.target.value);
    if (event.target.value.includes("\n")) {
      console.log("hello)")
      const val = event.target.value.replace("\n", "");
      if (val != "") {
        console.log("submitting", val);
        dispatch(addSpeech(val));
      }
      setSpeechContent("");
    } else {
      setSpeechContent(event.target.value);
    }
  };
  
  const onEdgesChange = (event) => {
    addEdge();
  };
  
  const onConnect = (event) => {
    console.log("connecting", event);
    dispatch(addEdge({ source: event.source, target: event.target }));
  }

  const renderedCards = [];
  /*
  cards.forEach((card, idx) => {
    renderedCards.push(
      <Card sx={{ minWidth: 275, margin: 2 }} raised={cursor == idx}>
        <CardContent>{card}</CardContent>
      </Card>
    );
  });
  */

  const renderedNodes = [];
  console.log('cards', cards);
  cards.forEach((speech, speechIdx) => {
    console.log(speechIdx, cursorSpeechId, cursorCellId, speech.length);
    console.log('speech', speech);
    speech.forEach((card, cardIdx) => {
      console.log('card', card);
      renderedNodes.push({
        id: "card_" + speechIdx + '_' + cardIdx,
        position: { x: 200 * speechIdx + 15, y: 100 * (cardIdx + 1) },
        data: { label: card },
      });
    });
    
    if (speechIdx == cursorSpeechId && cursorCellId == speech.length) {
      renderedNodes.push({
        id: "card-entry-" + speechIdx,
        position: { x: 200 * speechIdx + 15, y: 100 * (speech.length + 1) },
        type: 'textEntry'
      }); 
    }
  });
  
  const renderedSpeeches = [];
  speeches.forEach((speech, idx) => {
    renderedNodes.push({
      id: "speech_" + idx,
      position: { x: 200 * idx, y: 0},
      data: { label: speech },
      type: 'speechLabel'
    });
  });
  
  const renderedEdges = [];
  edges.forEach((edge, idx) => {
    renderedEdges.push({
      id: "edge_" + idx,
      source: edge.source,
      target: edge.target
    });
  });
  
  const nodeTypes = {
    textEntry: TextEntryNode,
    basic: BasicCardNode,
    highlighted: HighlightedCardNode,
    speechLabel: SpeechLabelNode
  };

  /*
  <Card sx={{ minWidth: 275, margin: 2 }} raised>
    <CardContent>
      <TextField
        id="new-speech"
        label="New speech"
        variant="standard"
        fullWidth
        multiline
        maxRows={1}
        value={speechContent}
        onChange={handleSpeechContentsEdit}
      />
    </CardContent>
  </Card>
  <Card sx={{ minWidth: 275, margin: 2 }} raised>
    <CardContent>
      <TextField
        autoFocus={false}
        id="new-card"
        label="New card"
        variant="standard"
        multiline
        fullWidth
        maxRows={4}
        value={cardContent}
        onChange={handleCardContentsEdit}
      />
    </CardContent>
  </Card>
  */
  
  return (
    <div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={renderedNodes}
          edges={renderedEdges}
          nodeTypes={nodeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          proOptions={{hideAttribution: true}}
        >
          <Panel position="top-left">{cursorSpeechId} - {cursorCellId}</Panel>
        </ReactFlow>
      </div>
    </div>
  );
}
