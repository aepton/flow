import { createSlice } from "@reduxjs/toolkit";

function setProvisionalEdge(state) {
    if (state.shiftPressed) {
        state.provisionalEdge = {
            source: `card_${state.shiftPressed}`,
            target: `card_${state.cards[state.speechId][state.cellId].id}`,
        };
    }
}

export const flowSlice = createSlice({
    name: "flow",
    initialState: {
        cards: [[]],
        cardIdx: 0,
        cellId: 0,
        clusters: {},
        date: null,
        edges: [],
        editingMode: true,
        flyoutOpen: false,
        instance: null,
        moderators: [],
        provisionalEdge: null,
        selectedNode: null,
        selectedTags: [],
        shiftPressed: null,
        shouldCenterOnActive: false,
        source: null,
        speeches: [{ label: "", id: 0 }],
        speechId: 0,
        speechNodes: [],
        speechYPosition: 0,
        status: "node",
        tags: [],
        title: "",
        url: null,
    },
    reducers: {
        addCardAfter: (state, action) => {
            const card = {
                id: action.payload.cardId,
                cardIdx: state.cardIdx,
                speech: action.payload.speechId,
                text: action.payload.card,
            };
            if (state.cards[state.speechId].length === 0) {
                state.cards[state.speechId].splice(0, 0, card);
                state.cellId = 1;
            } else {
                state.cards[state.speechId].push(card);
                state.cellId = state.cards[state.speechId].length;
            }
            state.cardIdx += 1;
        },
        addEdge: (state, action) => {
            state.edges.push(action.payload);
        },
        confirmEdge: (state, action) => {
            state.edges.push(state.provisionalEdge);
            state.provisionalEdge = null;
            state.shiftPressed = null;
            window.shiftPressed = state.shiftPressed;
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
            if (state.cellId > 0) {
                state.shouldCenterOnActive = true;
            } else {
                state.status = `speechHeader${state.speechId}`;
            }
            if (state.cellId >= 0) {
                state.cellId -= 1;
            }
            setProvisionalEdge(state);
        },
        moveDown: (state) => {
            state.status = "node";
            if (state.cards[state.speechId].length > state.cellId) {
                state.cellId += 1;
                state.shouldCenterOnActive = true;
            }
            setProvisionalEdge(state);
        },
        moveLeft: (state) => {
            state.status = "node";
            if (state.speechId > 0) {
                state.speechId -= 1;
            }
            if (state.cellId > state.cards[state.speechId].length) {
                state.cellId = state.cards[state.speechId].length;
            }
            state.shouldCenterOnActive = true;
            setProvisionalEdge(state);
        },
        moveRight: (state) => {
            state.status = "node";
            state.speechId += 1;
            if (state.cards.length <= state.speechId) {
                if (state.cards[state.speechId - 1].length > 0) {
                    state.cards.push([]);
                    state.speeches.push({
                        label: "",
                        id: state.speeches.length,
                    });
                    state.cellId = 0;
                } else {
                    state.speechId -= 1;
                }
            }
            state.cellId = Math.min(
                state.cards[state.speechId].length,
                state.cellId
            );
            state.shouldCenterOnActive = true;
            setProvisionalEdge(state);
        },
        removeEdge: (state, action) => {
            state.edges = state.edges.filter(
                (edge) =>
                    edge.source !== action.payload.source &&
                    edge.target !== action.payload.target
            );
        },
        removeCard: (state, action) => {
            state.cards = state.cards.filter(
                (card) => card.id !== action.payload
            );
            const edgeId = `card_${action.payload}`;
            state.edges = state.edges.filter(
                (edge) => edge.source !== edgeId || edge.target !== edgeId
            );
        },
        setCards: (state, action) => {
            state.cards = action.payload;
        },
        setCardHeightWidth: (state, action) => {
            const positionCards = [];
            state.cards.forEach((speech) => {
                const speechPositions = [];
                speech.forEach((card) => {
                    const id = `card_${card.id}`;
                    speechPositions.push({ ...card, ...action.payload[id] });
                });
                positionCards.push(speechPositions);
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
        setShiftPressed: (state, action) => {
            if (action.payload === true) {
                state.shiftPressed =
                    state.cards[state.speechId][state.cellId].id;
            } else {
                state.shiftPressed = null;
                state.provisionalEdge = null;
            }
            window.shiftPressed = state.shiftPressed;
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
            state.speeches = [];

            const moderatorTag = " (moderator)";
            Array.from(document.getElementsByClassName("speechLabel")).forEach(
                (speech) => {
                    state.speeches.push({
                        label: speech.innerText
                            .replace("<br>", "")
                            .replace(/[\n\r]+/g, "")
                            .replace(moderatorTag, "")
                            .trim(),
                        id: speech.getAttribute("data-speechid"),
                    });
                }
            );
        },
        setStatus: (state, action) => {
            window.status = action.payload;
            state.status = action.payload;
        },
        escapeStatus: (state) => {
            if (state.status === "tagging") {
                state.status = "node";
            }
        },
        addItemToTag: (state, action) => {
            console.log(action);
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
            if (action.payload === null) {
                return;
            }

            state = { ...state, ...action.payload };

            state.cellId = 0;
            state.speechId = 0;
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
                speeches[speech.id] = { left: "", right: "" };
                if (idx === 0) {
                    speeches[speech.id]["left"] = state.speeches[lastIdx].id;
                    speeches[speech.id]["right"] = state.speeches[idx + 1].id;
                } else if (idx === lastIdx) {
                    speeches[speech.id]["left"] = state.speeches[idx - 1].id;
                    speeches[speech.id]["right"] = state.speeches[0].id;
                } else {
                    speeches[speech.id]["left"] = state.speeches[idx - 1].id;
                    speeches[speech.id]["right"] = state.speeches[idx + 1].id;
                }
            });

            state.cards.forEach((card) => {
                if (card.id === action.payload.cardId) {
                    card.speech =
                        speeches[card.speech][action.payload.direction].id;
                }
                cards.push(card);
            });

            state.cards = cards;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addCardAfter,
    addEdge,
    confirmEdge,
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
    setShiftPressed,
    setShouldCenterOnActive,
    setSpeeches,
    setSpeechNodes,
    setSpeechYPosition,
    setStatus,
    toggleFlyoutOpen,
    toggleEditingMode,
} = flowSlice.actions;

export default flowSlice.reducer;
