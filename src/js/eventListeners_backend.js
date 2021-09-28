$(document).on("mousedown", ".node", function (event) {

    /* if double click */
    if (event.detail == 2) {
        CAM.selecteNode($(this)[0].id);
        if (CAM.currentNode != null) {
            // get text of current node
            document.getElementById("inptextnode").value = CAM.currentNode.getText();
            // get comment of current node
            document.getElementById("inpcommentnode").value = CAM.currentNode.getComment();
            // get value slider, hide / show graphics / change colors
            var backendGreenColorNodeSlider = document.querySelector('.greenColorNodeSlider');
            var backendRedColorNodeSlider = document.querySelector('.redColorNodeSlider');

            if (CAM.currentNode.value == 0) {
                document.getElementById("nodeSlider").value = 5;
                $('#negNodeShow').hide();
                $('#ambivalentNodeShow').hide();
                $('#neutralNodeShow').show();
                $('#posNodeShow').hide();
                backendRedColorNodeSlider.style.backgroundColor = "hsl(0, 50%, 60%)";
                backendGreenColorNodeSlider.style.backgroundColor = "hsl(110, 50%, 60%)";
            } else if (CAM.currentNode.value == 10) {
                document.getElementById("nodeSlider").value = 4;
                $('#negNodeShow').hide();
                $('#ambivalentNodeShow').show();
                $('#neutralNodeShow').hide();
                $('#posNodeShow').hide();
                backendRedColorNodeSlider.style.backgroundColor = "hsl(0, 50%, 60%)";
                backendGreenColorNodeSlider.style.backgroundColor = "hsl(110, 50%, 60%)";
            } else if (CAM.currentNode.value < 0) {
                $('#negNodeShow').show();
                $('#ambivalentNodeShow').hide();
                $('#neutralNodeShow').hide();
                $('#posNodeShow').hide();
                if (CAM.currentNode.value == -1) {
                    document.getElementById("nodeSlider").value = 3;
                    backendRedColorNodeSlider.style.backgroundColor = "hsl(0, 50%, 60%)";
                } else if (CAM.currentNode.value == -2) {
                    document.getElementById("nodeSlider").value = 2;
                    backendRedColorNodeSlider.style.backgroundColor = "hsl(0, 50%, 50%)";
                } else if (CAM.currentNode.value == -3) {
                    document.getElementById("nodeSlider").value = 1;
                    backendRedColorNodeSlider.style.backgroundColor = "hsl(0, 50%, 40%)";
                }
            } else if (CAM.currentNode.value > 0 && CAM.currentNode.value <= 4) {
                $('#negNodeShow').hide();
                $('#ambivalentNodeShow').hide();
                $('#neutralNodeShow').hide();
                $('#posNodeShow').show();
                if (CAM.currentNode.value == 1) {
                    document.getElementById("nodeSlider").value = 6;
                    backendGreenColorNodeSlider.style.backgroundColor = "hsl(110, 50%, 60%)";
                } else if (CAM.currentNode.value == 2) {
                    document.getElementById("nodeSlider").value = 7;
                    backendGreenColorNodeSlider.style.backgroundColor = "hsl(110, 50%, 50%)";
                } else if (CAM.currentNode.value == 3) {
                    document.getElementById("nodeSlider").value = 8;
                    backendGreenColorNodeSlider.style.backgroundColor = "hsl(110, 50%, 40%)";
                }
            }

            $("#dialogInteractionNode").dialog("open");
        }
    } else {
        CAM.readyToMove = true;
        resetConnectorSelection();
        CAM.selecteNode($(this)[0].id);
    }

    CAM.draw();
});


$(document).on("mouseup", ".node", function (event) {
    CAM.readyToMove = false;
    if (CAM.hasElementMoved) {

        resetConnectorSelection();
        resetNodeSelection();
        CAM.hasElementMoved = false;
        CAM.draw();
    }
});


/* for what these two event handlers??? */

$(document).on("click", ".connector", function (event) {
    resetConnectorSelection();
    resetNodeSelection();
    CAM.selectConnection($(this)[0].id)

    CAM.draw();
});

$(document).on("click", ".outer-connector", function (event) {
    resetConnectorSelection();
    resetNodeSelection();
    CAM.selectConnection($(this)[0].id)

    CAM.draw();
});


$(document).on("mousedown", ".connector, .outer-connector", function (event) {
    resetConnectorSelection();
    resetNodeSelection();
    CAM.selectConnection($(this)[0].id);

    if (CAM.currentConnector != null) {
        var backendGreenColorSlider = document.querySelector('.greenConnectorColorSlider');
        var backendGreenColorTick = document.querySelector('.greenColorTick');

        var backendRedColorSlider = document.querySelector('.redColorConnectorSlider');
        var backendRedColorTick = document.querySelector('.redColorTick');


        if (CAM.currentConnector.agreement) {
            backendRedColorSlider.style.backgroundColor = "white";
            backendRedColorTick.style.backgroundColor = "white";

            document.getElementById("edgeSlider").value = CAM.currentConnector.getIntensity() / IncreaseSliderIntensity + 3;
            if (document.getElementById("edgeSlider").value == 4) {
                backendGreenColorSlider.style.backgroundColor = "hsl(110, 50%, 60%)";
                backendGreenColorTick.style.backgroundColor = "hsl(110, 50%, 60%)";
            } else if (document.getElementById("edgeSlider").value == 5) {
                backendGreenColorSlider.style.backgroundColor = "hsl(110, 50%, 50%)";
                backendGreenColorTick.style.backgroundColor = "hsl(110, 50%, 50%)";
            }
            if (document.getElementById("edgeSlider").value == 6) {
                backendGreenColorSlider.style.backgroundColor = "hsl(110, 50%, 40%)";
                backendGreenColorTick.style.backgroundColor = "hsl(110, 50%, 40%)";
            }
        } else if (!CAM.currentConnector.agreement) {
            backendGreenColorSlider.style.backgroundColor = "white";
            backendGreenColorTick.style.backgroundColor = "white";

            if (CAM.currentConnector.getIntensity() == IncreaseSliderIntensity) {
                document.getElementById("edgeSlider").value = 3;
                backendRedColorSlider.style.backgroundColor = "hsl(0, 50%, 60%)";
                backendRedColorTick.style.backgroundColor = "hsl(0, 50%, 60%)";
            } else if (CAM.currentConnector.getIntensity() == IncreaseSliderIntensity * 2) {
                document.getElementById("edgeSlider").value = 2;
                backendRedColorSlider.style.backgroundColor = "hsl(0, 50%, 50%)";
                backendRedColorTick.style.backgroundColor = "hsl(0, 50%, 50%)";
            } else if (CAM.currentConnector.getIntensity() == IncreaseSliderIntensity * 3) {
                document.getElementById("edgeSlider").value = 1;
                backendRedColorSlider.style.backgroundColor = "hsl(0, 50%, 40%)";
                backendRedColorTick.style.backgroundColor = "hsl(0, 50%, 40%)";
            }
        }
        $("#dialogInteractionEdge").dialog("open");
    }

    CAM.draw();
});


$(document).on("click", "#background", function (event) {

    if (!(resetConnectorSelection() || resetNodeSelection())) {
        const positionClick = {
            x: (event.clientX - $("#CAMSVG").position().left), // / zoomScale,
            y: (event.clientY - $("#CAMSVG").position().top), // / zoomScale
        }

        const isNearby = CAM.getElementNearby(positionClick);
        if (!isNearby) {
            CAM.addElement(new NodeCAM(1, " ", positionClick, 1, 1, 1));
        }
    }

    CAM.draw();
});


$(document).on("mousemove", "#CAMSVG", function (event) {
    const positionClick = {
        x: (event.clientX - $("#CAMSVG").position().left), // / zoomScale,
        y: (event.clientY - $("#CAMSVG").position().top), // / zoomScale
    }
    if (CAM.readyToMove) {
        CAM.hasElementMoved = true;
        CAM.updateElement("position", positionClick);
    } else {
        //const isNearby = CAM.getElementNearby(positionClick);
        //if(!isNearby){
        //    resetConnectorSelection();
        //}
    }
    CAM.draw();
});

$(document).on("mouseup", "#CAMSVG", function (event) {
    if (CAM.readyToMove) {
        CAM.readyToMove = false;
        resetNodeSelection();
        CAM.draw();
    }
});

function resetConnectorSelection() {
    if (CAM.hasSelectedConnector) {
        CAM.unselectConnection();
        return true;
    }
    return false;
}

function resetNodeSelection() {
    if (CAM.hasSelectedNode) {
        CAM.unselectNode();
        return true;
    }
    return false;
}



/* keep it for debug purpose
document.addEventListener('keydown', (e) => {
    console.log(e.code);
    if (e.code === "Delete" || e.code === "Backspace") { // change!
        if (CAM.hasSelectedNode || CAM.hasSelectedConnector) {
            CAM.deleteElement();
        }
    }
});
*/