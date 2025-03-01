import {
    addItemToTag,
    createTag,
    removeTagFromItem,
    setCardHeightWidth,
} from "../slices/flowSlice";

import { generateEntryNode } from "../components/textEntryNode";
import { generateClustersFromEdges } from "./clusters";

import { useSelector, useDispatch } from "react-redux";

export function renderCards(
    selectedTags,
    columnWidth,
    columnPadding,
    yPadding,
    recenterPadding,
    shouldCenterOnActive
) {
    const cards = useSelector((state) => state.flow.cards);
    const cardIdx = useSelector((state) => state.flow.cardIdx);
    const cellId = useSelector((state) => state.flow.cellId);
    const shiftPressed = useSelector((state) => state.flow.shiftPressed);
    const speechId = useSelector((state) => state.flow.speechId);
    const edges = useSelector((state) => state.flow.edges);
    const tags = useSelector((state) => state.flow.tags);

    const allTags = Object.keys(tags);
    const { clusters } = generateClustersFromEdges(edges);

    const dispatch = useDispatch();

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
                            dispatch(addItemToTag({ item: clusterId, tag })),
                        removeTag: (tag) =>
                            dispatch(
                                removeTagFromItem({ item: clusterId, tag })
                            ),
                        createTag: (tag) => dispatch(createTag(tag)),
                        nodeIdx: cardIdx,
                    },
                    selectable: editingMode,
                    type: "argument",
                    style: {
                        width: columnWidth,
                        opacity: visible ? 1 : 0,
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
                    cards[speechCardIdx].length,
                    columnWidth,
                    columnPadding
                )
            );
        }
    });

    if (cards[0].length === 0) {
        renderedNodes.push(generateEntryNode(0, 0, columnWidth, columnPadding));
    }

    if (activeNode) {
        renderedNodes.push(activeNode);
    }

    return { renderedNodes, dirty, yPosition, recenterY };
}

export function renderEdges(dirty) {
    const edges = useSelector((state) => state.flow.edges);
    const provisionalEdge = useSelector((state) => state.flow.provisionalEdge);

    const dispatch = useDispatch();
    const renderedEdges = [];

    if (dirty) {
        setTimeout(() => {
            if (!window.instance.getNodes) {
                return;
            }

            const info = {};
            window.instance.getNodes().forEach((node) => {
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
                type: "smart",
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
            type: "smart",
        });
    }

    return renderedEdges;
}
