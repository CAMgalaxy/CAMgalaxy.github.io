var CAM = new Elements();
const svgns = "http://www.w3.org/2000/svg";

var zoomScale = 0.6;

let arrow = document.createElementNS(svgns, "defs");

let arrowRight = document.createElementNS(svgns, "marker");
arrowRight.setAttribute("id", "arrowRight");
arrowRight.setAttribute("markerWidth", "10");
arrowRight.setAttribute("markerHeight", "7");
arrowRight.setAttribute("refX", "10");
arrowRight.setAttribute("refY", "3.5");
arrowRight.setAttribute("orient", "auto");

let polyR = document.createElementNS(svgns, "polygon");
polyR.setAttribute("points", "10 0, 10 7, 0 3.5");

arrowRight.appendChild(polyR);
arrow.appendChild(arrowRight);

let arrowLeft = document.createElementNS(svgns, "marker");
arrowLeft.setAttribute("id", "arrowLeft");
arrowLeft.setAttribute("markerWidth", "10");
arrowLeft.setAttribute("markerHeight", "7");
arrowLeft.setAttribute("refX", "0");
arrowLeft.setAttribute("refY", "3.5");
arrowLeft.setAttribute("orient", "auto");

let polyL = document.createElementNS(svgns, "polygon");
polyL.setAttribute("points", "0 0, 10 3.5, 0 7");

arrowLeft.appendChild(polyL);
arrow.appendChild(arrowRight);

/* variables front end */
// colors for highlighting selected elements
const highlightSelected = "#33FFFF";
const highlightAdjacent = "#C0C0C0";