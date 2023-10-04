import { createSlice } from "@reduxjs/toolkit";

export const flowSlice = createSlice({
  name: "flow",
  initialState: {
    cards: [],
    cellId: -1,
    clusters: {},
    edges: [],
    instance: null,
    meta: null,
    selectedNode: null,
    selectedTags: [],
    shouldCenterOnActive: false,
    speeches: ['Speech 1'],
    speechId: 0,
    speechNodes: [],
    speechYPosition: 0,
    status: 'navigating',
    tags: [],
    title: ''
  },
  reducers: {
    addCard: (state, action) => {
      state.cards[action.payload.speechId].push(action.payload.card);
      state.cellId += 1;
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    addSpeech: (state, action) => {
      state.speeches.push(action.payload);
    },
    editSpeechTitle: (state, action) => {
      state.speeches[action.payload.speechId] = action.payload.speechName;
    },
    moveUp: (state) => {
      console.log('moving up', state);
      if (state.cellId >= 0) {
        state.cellId -= 1;
      }
    },
    moveDown: (state) => {
      console.log('moving down', state.cards.length, state.cellId);
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
    setCards: (state, action) => {
      console.log('setting cards', state, JSON.stringify(action));
      state.cards = action.payload;
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
      console.log('setting status');
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
      state.edges = action.payload.edges;
      state.meta = action.payload.meta;
      state.tags = action.payload.tags;
      state.title = action.payload.title;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
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
  setCards,
  setInitialStateForRound,
  setInstance,
  setSelectedNode,
  setSelectedTags,
  setShouldCenterOnActive,
  setSpeechNodes,
  setSpeechYPosition,
  setStatus
} = flowSlice.actions;

export default flowSlice.reducer;
