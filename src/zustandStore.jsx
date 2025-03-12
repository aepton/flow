import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

export default create((set, get) => ({
    nodes: [],
    edges: [],
    getNodes: () => get().nodes,
    getEdges: () => get().edges,
    setNodes: (nodes) => {
        console.log("setting", nodes);
        return set({ nodes });
    },
    setEdges: (edges) => set({ edges }),

    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },

    selectedElements: [],
    isConnecting: false,
    copiedElements: null,

    setSelectedElements: (elements) => set({ selectedElements: elements }),
    setIsConnecting: (isConnecting) => set({ isConnecting }),
    setCopiedElements: (elements) => set({ copiedElements: elements }),

    viewport: { x: 0, y: 0, zoom: 1 },
    nodeInternals: new Map(),
    edgeInternals: new Map(),

    getViewport: () => get().viewport,
    setViewport: (viewport) => set({ viewport }),

    getNodePositionChange: () => {},
}));
