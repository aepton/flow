export default function setColorScheme() {
    const colors = [
        "#ff9ecd", // muted pink
        "#98e0e8", // soft cyan
        "#a6e8b0", // pale mint
        "#c5a3e8", // dusty lavender
        "#ffb5a3", // peachy coral
        "#8eb5ff", // powder blue
        "#ffe5a3", // pale yellow
        "#ffcce6", // baby pink
        "#a3e8d5", // soft teal
        "#ff9eb2", // faded rose
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.documentElement.style.setProperty("--fun-color", randomColor);

    document.documentElement.style.setProperty(
        "--fun-color-faint",
        randomColor + "20"
    );
}
