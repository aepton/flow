import {
    addItemToTags,
    removeTagFromItem,
    setCardHeightWidth,
} from "../slices/flowSlice";

import { generateEntryNode } from "../components/textEntryNode";
import { generateClustersFromEdges } from "./clusters";
import { generateDimensions } from "./dimensions";

export function renderCards(flow, dispatch) {
    /*
    if (!flow) {
        const { columnWidth, columnPadding } = generateDimensions([]);
        addNodes(generateEntryNode(0, columnWidth, columnPadding, 0));
        return;
    }
    */

    const {
        cards,
        cellId,
        selectedTags,
        shiftPressed,
        speeches,
        speechId,
        edges,
        tags,
        shouldCenterOnActive,
    } = flow;

    const { columnWidth, columnPadding, yPadding, recenterPadding } =
        generateDimensions(speeches);

    const allTags = Object.keys(tags);
    const { clusters } = generateClustersFromEdges(edges);

    let recenterY = -1;
    let yPosition = 0;
    const editingMode = true;
    const renderedNodes = [];
    let activeNode = null;
    let dirty = false;

    cards.forEach((speechCards, speechCardIdx) => {
        yPosition = 0;
        speechCards.forEach((card, cardIdx) => {
            const cardId = `card_${card.id}`;

            const active = cellId === cardIdx && speechId === speechCardIdx;

            const visible = Object.keys(card).indexOf("height") !== -1;
            if (!visible) {
                console.log("not visible", cardId);
                dirty = true;
            }

            const cardTags = [];
            Object.keys(tags).forEach((key) => {
                if (tags[key].indexOf(card.id) != -1) {
                    cardTags.push(key);
                }
            });

            let isSelectedTag = false;
            if (selectedTags.length === 0) {
                isSelectedTag = true;
            } else {
                isSelectedTag = true;
                selectedTags.forEach((tag) => {
                    if (tags[tag].indexOf(card.id) === -1) {
                        isSelectedTag = false;
                    }
                });
            }

            const isShiftBasisTag = card.id === shiftPressed;

            if (isSelectedTag) {
                const node = {
                    id: cardId,
                    position: {
                        x:
                            columnWidth * speechCardIdx +
                            (columnPadding * speechCardIdx + 1),
                        y: yPosition,
                    },
                    data: {
                        text: card.text,
                        shiftBasis: isShiftBasisTag,
                        active,
                        editingMode,
                        sourceHandle: true,
                        targetHandle: true,
                        id: card.id,
                        tags: cardTags,
                        allTags,
                        speech: card.speech,
                        clusterHead: clusters[cardId] === cardId,
                        addTag: (tag) =>
                            dispatch(
                                addItemToTags({ item: cardId, tags: [tag] })
                            ),
                        removeTag: (tag) =>
                            dispatch(removeTagFromItem({ item: cardId, tag })),
                        createTag: (tag) => dispatch(createTag(tag)),
                        nodeIdx: cardIdx,
                    },
                    selectable: editingMode,
                    type: "argument",
                    style: {
                        width: columnWidth,
                        border: isShiftBasisTag
                            ? "2px dashed var(--fun-color)"
                            : "none",
                    },
                };

                if (active) {
                    activeNode = node;
                } else {
                    renderedNodes.push(node);
                }

                if (shouldCenterOnActive && active) {
                    recenterY = yPosition - recenterPadding;
                }

                yPosition += (card.height || 0) + yPadding;
            }
        });

        if (
            editingMode &&
            cellId == cards[speechCardIdx].length &&
            speechId == speechCardIdx
        ) {
            renderedNodes.push(
                generateEntryNode(
                    speechCardIdx,
                    columnWidth,
                    columnPadding,
                    yPosition
                )
            );
        }
    });

    if (cards[0].length === 0) {
        renderedNodes.push(generateEntryNode(0, columnWidth, columnPadding, 0));
    }

    if (activeNode) {
        renderedNodes.push(activeNode);
    }

    return { renderedNodes, recenterY, yPosition, dirty };
}

export function renderEdges(flow, dirty, getNodes, dispatch) {
    const { edges, provisionalEdge } = flow;

    const renderedEdges = [];

    if (dirty) {
        setTimeout(() => {
            if (!getNodes) {
                return;
            }

            const info = {};
            getNodes().forEach((node) => {
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
                style: {
                    stroke: "var(--fun-color)",
                    strokeWidth: 3,
                },
            });
        });
    }
    if (provisionalEdge) {
        renderedEdges.push({
            id: "edge_provisional",
            source: provisionalEdge.source,
            target: provisionalEdge.target,
            style: {
                stroke: "var(--fun-color)",
                strokeWidth: 3,
                strokeDasharray: "5,5",
            },
            animated: true,
        });
    }

    return renderedEdges;
}
