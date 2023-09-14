import { createSlice } from "@reduxjs/toolkit";

export const flowSlice = createSlice({
  name: "flow",
  initialState: {
    cards: [[]],
    cellId: 0,
    edges: [],
    speechId: 0,
    speeches: [[]]
  },
  reducers: {
    addCard: (state, action) => {
      console.log(action);
      state.cards[action.payload.speechId].push(action.payload.card);
      state.cellId += 1;
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    addSpeech: (state, action) => {
      state.speeches.push(action.payload);
    },
    moveUp: (state) => {
      if (state.cellId >= 0) {
        state.cellId -= 1;
      }
    },
    moveDown: (state) => {
      if (state.cards[state.speechId].length > state.cellId) {
        state.cellId += 1; 
      }
    },
    moveLeft: (state) => {
      if (state.speechId > 0) {
        state.speechId -= 1; 
      }
    },
    moveRight: (state) => {
      if (state.cards.length > state.speechId) {
        state.speechId += 1; 
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  addCard,
  addEdge,
  addSpeech,
  moveUp,
  moveDown,
  moveLeft,
  moveRight
} = flowSlice.actions;

export default flowSlice.reducer;
