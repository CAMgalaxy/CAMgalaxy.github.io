let arrow = document.createElementNS(svgns, "defs");

let arrowRight = document.createElementNS(svgns, "marker");
arrowRight.setAttribute("id", "arrowRight");
arrowRight.setAttribute("markerWidth", "20");
arrowRight.setAttribute("markerHeight", "10");
arrowRight.setAttribute("refX", "20");
arrowRight.setAttribute("refY", "5");
arrowRight.setAttribute("orient", "auto");
arrowRight.setAttribute("markerUnits", "userSpaceOnUse");

let polyR = document.createElementNS(svgns, "polygon");
if (config.HideConDirInf == true) {
    polyR.setAttribute("points", "0 0, 0 0, 0 0");
}else{
    polyR.setAttribute("points", "20 0, 20 10, 0 5");
}

polyR.setAttribute("fill", "#5A5A5A");
arrowRight.appendChild(polyR);
arrow.appendChild(arrowRight);

let arrowLeft = document.createElementNS(svgns, "marker");
arrowLeft.setAttribute("id", "arrowLeft");
arrowLeft.setAttribute("markerWidth", "20");
arrowLeft.setAttribute("markerHeight", "10");
arrowLeft.setAttribute("refX", "0");
arrowLeft.setAttribute("refY", "5");
arrowLeft.setAttribute("orient", "auto");
arrowLeft.setAttribute("markerUnits", "userSpaceOnUse");

let polyL = document.createElementNS(svgns, "polygon");
if (config.HideConDirInf == true) {
    polyL.setAttribute("points", "0 0, 0 0, 0 0");
}else{
    polyL.setAttribute("points", "0 0, 20 5, 0 10");
}
polyL.setAttribute("fill", "#5A5A5A");
arrowLeft.appendChild(polyL);
arrow.appendChild(arrowLeft);

/*
arrowLeft.setAttribute("id", "arrowLeft");
arrowLeft.setAttribute("markerWidth", "30");
arrowLeft.setAttribute("markerHeight", "15");
arrowLeft.setAttribute("refX", "0");
arrowLeft.setAttribute("refY", "7.5");
arrowLeft.setAttribute("orient", "auto");
arrowLeft.setAttribute("markerUnits", "userSpaceOnUse");

let polyL = document.createElementNS(svgns, "polygon");
if (config.HideConDirInf == true) {
    polyL.setAttribute("points", "0 0, 0 0, 0 0");
}else{
    polyL.setAttribute("points", "0 0, 30 7.5, 0 15");
}
*/