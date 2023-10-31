import { createSlice } from "@reduxjs/toolkit";

export const flowSlice = createSlice({
  name: "flow",
  initialState: {
    cards: [],
    cellId: -1,
    clusters: {},
    date: null,
    edges: [],
    editingMode: false,
    flyoutOpen: false,
    instance: null,
    moderators: [],
    selectedNode: null,
    selectedTags: [],
    shouldCenterOnActive: false,
    source: null,
    speeches: [],
    speechId: 0,
    speechNodes: [],
    speechYPosition: 0,
    status: 'navigating',
    tags: [],
    title: '',
    url: null
  },
  reducers: {
    addCardAfter: (state, action) => {
      let existingIdx = -1;
      let existingSpeech = null;
      state.cards.forEach((card, idx) => {
        if (card.id === action.payload) {
          existingIdx = idx;
          existingSpeech = card.speech;
        }
      });
      if (!existingSpeech) {
        existingSpeech = state.cards[-1].speech;
      }
      const newIdx = existingIdx + 1;
      state.cards.splice(newIdx, 0, { id: crypto.randomUUID(), speech: existingSpeech, text: '?' });
      state.cellId = newIdx;
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    addSpeech: (state, action) => {
      state.speeches.push(action.payload);
    },
    editCardText: (state, action) => {
      let idx = -1;
      console.log(action);
      state.cards.forEach((card, cardIdx) => {
        if (card.id === action.payload.id) {
          idx = cardIdx;
        }
      });
      if (idx !== -1) {
        state.cards[idx].text = action.payload.text;
      }
    },
    editSpeechTitle: (state, action) => {
      state.speeches[action.payload.speechId] = action.payload.speechName;
    },
    moveUp: (state) => {
      if (state.cellId >= 0) {
        state.cellId -= 1;
      }
    },
    moveDown: (state) => {
      if (state.cards.length > state.cellId) {
        state.cellId += 1;
        state.shouldCenterOnActive = true;
      }
    },
    moveLeft: (state) => {
      if (state.speechId > 0) {
        state.speechId -= 1; 
      }
    },
    moveRight: (state) => {
      state.speechId += 1;
      if (state.cards.length <= state.speechId) {
        state.cards.push([]);
        state.speeches.push([`Speech ${state.speeches.length + 1}`]); 
        state.cellId = 0;
      }
    },
    removeEdge: (state, action) => {
      state.edges = state.edges.filter(
        edge => edge.source !== action.payload.source && edge.target !== action.payload.target
      );
    },
    removeCard: (state, action) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
      const edgeId = `card_${action.payload}`;
      state.edges = state.edges.filter(edge => edge.source !== edgeId || edge.target !== edgeId);
    },
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    setCardHeightWidth: (state, action) => {
      const positionCards = [];
      state.cards.forEach(card => {
        const id = `card_${card.id}`;
        positionCards.push({ ...card, ...action.payload[id]});
      });
      state.cards = positionCards;
    },
    setInstance: (state, action) => {
      console.log('setting instance');
      state.instance = action.payload;
    },
    setSelectedNode: (state, action) => {
      console.log('setting selected node', state, action);
      state.cellId = action.payload;
    },
    setSelectedTags: (state, action) => {
      console.log('setting selected tags', action);
      state.selectedTags = action.payload;
    },
    setSpeechNodes: (state, action) => {
      console.log('setting speech nodes');
      state.speechNodes = action.payload;
    },
    setSpeechYPosition: (state, action) => {
      console.log('setting speech y position');
      state.speechYPosition = action.payload;
    },
    setShouldCenterOnActive: (state, action) => {
      console.log('centering on active?', action.payload);
      state.setShouldCenterOnActive = action.payload;
    },
    setStatus: (state, action) => {
      console.log('setting status', action.payload);
      window.status = action.payload;
      state.status = action.payload;
    },
    escapeStatus: (state) => {
      console.log('current status', state.status);
      if (state.status === 'tagging') {
        state.status = 'node';
      }
    },
    addItemToTag: (state, action) => {
      console.log('adding tag', action);
      const { item, tag } = action.payload;
      state.tags[tag].push(item);
    },
    removeTagFromItem: (state, action) => {
      console.log(state.tags, action.payload.tag, action);
      const { item, tag } = action.payload;
      state.tags[tag].splice(state.tags[tag].indexOf(item));
    },
    createTag: (state, action) => {
      console.log('creating tag', action.payload);
      if (Object.keys(state.tags).indexOf(action.payload) == -1) {
        state.tags[action.payload] = [];
      }
      console.log(JSON.stringify(state.tags));
    },
    setInitialStateForRound: (state, action) => {
      console.log('setting state for round', state, action);

      state.cards = action.payload.cards;
      state.date = action.payload.date;
      state.edges = action.payload.edges;
      state.moderators = action.payload.moderators;
      state.source = action.payload.source;
      state.speeches = action.payload.speeches;
      state.tags = action.payload.tags;
      state.title = action.payload.title;
      state.url = action.payload.url;
    },
    toggleFlyoutOpen: (state) => {
      state.flyoutOpen = !state.flyoutOpen;
    },
    closeFlyout: (state) => {
      if (state.flyoutOpen) {
        state.flyoutOpen = false;
      }
    },
    toggleEditingMode: (state) => {
      state.editingMode = !state.editingMode;
    },
    moveNodeSpeech: (state, action) => {
      let idx = -1;
      let currentSpeech;
      state.cards.forEach((card, cardIdx) => {
        if (card.id === action.payload.cardId) {
          idx = cardIdx;
          currentSpeech = card.speech;
        }
      });
      if (idx !== -1 && currentSpeech) {
        let speechIdx = -1;
        state.speeches.forEach((speech, sIdx) => {
          if (speech.id === currentSpeech) {
            speechIdx = sIdx;
          }
        });
        if (speechIdx !== -1) {
          if (action.payload.direction === 'left') {
            if (speechIdx > 0) {
              speechIdx -= 1;
            } else {
              speechIdx = state.speeches.length - 1;
            }
          } else if (action.payload.direction === 'right') {
            if (speechIdx < state.speeches.length - 1) {
              speechIdx += 1;
            } else {
              speechIdx = 0;
            }            
          }

          console.log('got direction', action, idx, speechIdx, state.cards[idx].speech);
          state.cards[idx].speech = state.speeches[speechIdx].id;
        }
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  addCardAfter,
  addEdge,
  addItemToTag,
  addSpeech,
  closeFlyout,
  createTag,
  editCardText,
  editSpeechTitle,
  escapeStatus,
  moveNodeSpeech,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  removeEdge,
  removeCard,
  removeTagFromItem,
  setCards,
  setCardHeightWidth,
  setInitialStateForRound,
  setInstance,
  setSelectedNode,
  setSelectedTags,
  setShouldCenterOnActive,
  setSpeechNodes,
  setSpeechYPosition,
  setStatus,
  toggleFlyoutOpen,
  toggleEditingMode
} = flowSlice.actions;

export default flowSlice.reducer;
