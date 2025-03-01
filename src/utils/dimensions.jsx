export function generateDimensions(speeches) {
    const dimensions = {
        columnPadding: 200,
        windowWidth: window.innerWidth - 10,
        yPadding: 150,
        recenterPadding: window.innerHeight / 1,
    };
    dimensions.columnWidth = Math.min(
        (dimensions.windowWidth -
            dimensions.columnPadding * (speeches.length - 1)) /
            speeches.length,
        200
    );
    return dimensions;
}
