import { createSlice } from "@reduxjs/toolkit";

export const flowSlice = createSlice({
  name: "flow",
  initialState: {
    cards: [],
    cellId: 0,
    clusters: {},
    date: null,
    edges: [],
    editingMode: true,
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
    status: 'node',
    tags: [],
    title: '',
    url: null
  },
  reducers: {
    addCardAfter: (state, action) => {
      console.log(Date.now() / 1000, 'got state, action', state, action);
      const card = { id: crypto.randomUUID(), speech: action.payload.speechId, text: action.payload.card };
      console.log(card);
      if (state.cards.length === 0) {
        state.cards.splice(0, 0, card);
        state.cellId = 1;
        return;
      }

      /*
      let existingIdx = -1;
      let existingSpeech = null;
      state.cards.forEach((c, idx) => {
        if (c.id === action.payload) {
          existingIdx = idx;
          existingSpeech = c.speech;
        }
      });
      if (!existingSpeech) {
        console.log(state.cards);
        if (state.cards[-1]) {
          existingSpeech = state.cards[-1].speech;
        }
      }
      */
      // const newIdx = existingIdx + 1;
      // state.cards.splice(newIdx, 0, card);
      state.cards.push(card);
      state.cellId = state.cards.length;
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    addSpeech: (state, action) => {
      state.speeches.push(action.payload);
    },
    editCardText: (state, action) => {
      let idx = -1;
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
      state.instance = action.payload;
    },
    setSelectedNode: (state, action) => {
      state.cellId = action.payload;
    },
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    setSpeechNodes: (state, action) => {
      state.speechNodes = action.payload;
    },
    setSpeechYPosition: (state, action) => {
      state.speechYPosition = action.payload;
    },
    setShouldCenterOnActive: (state, action) => {
      state.setShouldCenterOnActive = action.payload;
    },
    setSpeeches: (state, action) => {
      state.speeches = action.payload;
    },
    setStatus: (state, action) => {
      window.status = action.payload;
      state.status = action.payload;
    },
    escapeStatus: (state) => {
      if (state.status === 'tagging') {
        state.status = 'node';
      }
    },
    addItemToTag: (state, action) => {
      const { item, tag } = action.payload;
      state.tags[tag].push(item);
    },
    removeTagFromItem: (state, action) => {
      const { item, tag } = action.payload;
      state.tags[tag].splice(state.tags[tag].indexOf(item));
    },
    createTag: (state, action) => {
      if (Object.keys(state.tags).indexOf(action.payload) == -1) {
        state.tags[action.payload] = [];
      }
    },
    setInitialStateForRound: (state, action) => {
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
      const cards = [];
      const speeches = {};

      const lastIdx = state.speeches.length - 1;
      state.speeches.forEach((speech, idx) => {
        speeches[speech.id] = {'left': '', 'right': ''};
        if (idx === 0) {
          speeches[speech.id]['left'] = state.speeches[lastIdx].id;
          speeches[speech.id]['right'] = state.speeches[idx + 1].id;
        } else if (idx === lastIdx) {
          speeches[speech.id]['left'] = state.speeches[idx - 1].id;
          speeches[speech.id]['right'] = state.speeches[0].id;
        } else {
          speeches[speech.id]['left'] = state.speeches[idx - 1].id;
          speeches[speech.id]['right'] = state.speeches[idx + 1].id;
        }
      });

      state.cards.forEach(card => {
        if (card.id === action.payload.cardId) {
          card.speech = speeches[card.speech][action.payload.direction].id;
        }
        cards.push(card);
      });

      state.cards = cards;
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
  setSpeeches,
  setSpeechNodes,
  setSpeechYPosition,
  setStatus,
  toggleFlyoutOpen,
  toggleEditingMode
} = flowSlice.actions;

export default flowSlice.reducer;
