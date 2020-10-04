// Any modification here must be done in './colors.scss'
const COLORS = {
    backgroundColor: "#f2f2f2",
    colorAccent: "#6138D8",
    colorAccentDim: "#8379D6",
    textColor: "#555555",
    labelColor: "#515358",
    labelBgColorFocus: "#f4f4f4",
    inputBgColorFocus: "#f7f7f7",
    fail: "#d93025",
    pass: "#3CBC8D",
}

COLORS.labelBgImageFocus = `linear-gradient(#fff, ${COLORS.labelBgColorFocus})`;

export {
    COLORS,
}