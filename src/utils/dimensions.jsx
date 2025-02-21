export function generateDimensions(speeches) {
    const dimensions = {
        columnPadding: 50,
        windowWidth: window.innerWidth - 10,
        yPadding: 30,
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
