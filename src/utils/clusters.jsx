export function generateClustersFromEdges(edges) {
    const clusters = {};
    const clusterHeads = {};

    edges.forEach((edge) => {
        if (Object.keys(clusters).indexOf(edge.source) == -1) {
            clusters[edge.source] = edge.source;
            clusters[edge.target] = edge.source;
        } else {
            clusters[edge.target] = clusters[edge.source];
        }
    });

    Object.keys(clusters).forEach((key) => {
        if (Object.keys(clusterHeads).indexOf(clusters[key]) == -1) {
            clusterHeads[clusters[key]] = 0;
        }
        clusterHeads[clusters[key]] += 1;
    });

    return { clusters, clusterHeads };
}
