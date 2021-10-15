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
                document.getElementById("nodeSlider").value = 4;

                document.getElementById("checkboxAmbivalent").checked  = false;
                document.getElementById("nodeSlider").disabled = false;

                /*
                $('#negNodeShow').hide();
                $('#ambivalentNodeShow').hide();
                $('#neutralNodeShow').show();
                $('#posNodeShow').hide();
                */
                backendRedColorNodeSlider.style.backgroundColor = "hsl(0, 50%, 60%)";
                backendGreenColorNodeSlider.style.backgroundColor = "hsl(110, 50%, 60%)";
            } else if (CAM.currentNode.value == 10) {
                document.getElementById("nodeSlider").value = 4;
                backendRedColorNodeSlider.style.backgroundColor = "hsl(0, 50%, 60%)";
                backendGreenColorNodeSlider.style.backgroundColor = "hsl(110, 50%, 60%)";

                document.getElementById("checkboxAmbivalent").checked  = true;
                document.getElementById("nodeSlider").disabled = true;
            } else if (CAM.currentNode.value < 0) {
                document.getElementById("checkboxAmbivalent").checked  = false;
                document.getElementById("nodeSlider").disabled = false;
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
                document.getElementById("checkboxAmbivalent").checked  = false;
                document.getElementById("nodeSlider").disabled = false;
                if (CAM.currentNode.value == 1) {
                    document.getElementById("nodeSlider").value = 5;
                    backendGreenColorNodeSlider.style.backgroundColor = "hsl(110, 50%, 60%)";
                } else if (CAM.currentNode.value == 2) {
                    document.getElementById("nodeSlider").value = 6;
                    backendGreenColorNodeSlider.style.backgroundColor = "hsl(110, 50%, 50%)";
                } else if (CAM.currentNode.value == 3) {
                    document.getElementById("nodeSlider").value = 7;
                    backendGreenColorNodeSlider.style.backgroundColor = "hsl(110, 50%, 40%)";
                }
            }

            /* change position of pop up */
            if ((CAM.currentNode.position.x - 380) < 0) {
                var changeAtLeft = "left+" + (CAM.currentNode.position.x + 70); // to far left position to right
            } else {
                var changeAtLeft = "left+" + (CAM.currentNode.position.x - 380); // position to left
            }
            var changeAtTop = "top+" + (CAM.currentNode.position.y - 10);


            $("#dialogInteractionNode").dialog({
                position: {
                    my: "left top", // add percentage offsets
                    at: changeAtLeft + " " + changeAtTop,
                    of: $(".boxCAMSVG")
                }
            });

            // console.log($('#dialogInteractionNode').dialog('option', 'position'));

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
    /* if double click */
    if (event.detail == 2) {
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
                    backendGreenColorSlider.style.backgroundColor = "hsl(110, 100%, 70%)";
                    backendGreenColorTick.style.backgroundColor = "hsl(110, 100%, 70%)";
                } else if (document.getElementById("edgeSlider").value == 5) {
                    backendGreenColorSlider.style.backgroundColor = "hsl(110, 100%, 50%)";
                    backendGreenColorTick.style.backgroundColor = "hsl(110, 100%, 50%)";
                }
                if (document.getElementById("edgeSlider").value == 6) {
                    backendGreenColorSlider.style.backgroundColor = "hsl(110, 100%, 40%)";
                    backendGreenColorTick.style.backgroundColor = "hsl(110, 100%, 40%)";
                }
            } else if (!CAM.currentConnector.agreement) {
                backendGreenColorSlider.style.backgroundColor = "white";
                backendGreenColorTick.style.backgroundColor = "white";

                if (CAM.currentConnector.getIntensity() == IncreaseSliderIntensity) {
                    document.getElementById("edgeSlider").value = 3;
                    backendRedColorSlider.style.backgroundColor = "hsl(0, 100%, 70%)";
                    backendRedColorTick.style.backgroundColor = "hsl(0, 100%, 70%)";
                } else if (CAM.currentConnector.getIntensity() == IncreaseSliderIntensity * 2) {
                    document.getElementById("edgeSlider").value = 2;
                    backendRedColorSlider.style.backgroundColor = "hsl(0, 100%, 50%)";
                    backendRedColorTick.style.backgroundColor = "hsl(0, 100%, 50%)";
                } else if (CAM.currentConnector.getIntensity() == IncreaseSliderIntensity * 3) {
                    document.getElementById("edgeSlider").value = 1;
                    backendRedColorSlider.style.backgroundColor = "hsl(0, 100%, 40%)";
                    backendRedColorTick.style.backgroundColor = "hsl(0, 100%, 40%)";
                }
            }

            /* change position of pop up */
            // > get current mother / daugther
            var currentMotherNode = CAM.nodes.filter(el => el.id === CAM.currentConnector.motherID)[0];
            var currentDaughterNode = CAM.nodes.filter(el => el.id === CAM.currentConnector.daughterID)[0];
            // > get midpoint of connector
            var MeanPositionX = (currentMotherNode.position.x + currentDaughterNode.position.x) / 2;
            var MeanPositionY = (currentMotherNode.position.y + currentDaughterNode.position.y) / 2;

            if ((MeanPositionX - 380) < 0) {
                var changeAtLeft = "left+" + (MeanPositionX + 40); // to far left position to right
            } else {
                var changeAtLeft = "left+" + (MeanPositionX - 340); // position to left
            }

            if(Math.abs(currentMotherNode.position.x - currentDaughterNode.position.x) < 300){
                var changeAtTop = "top+" + (MeanPositionY - 130); // x = horizontal spacing less than 300
            }else{
                var changeAtTop = "top+" + (MeanPositionY);
            }

            $("#dialogInteractionEdge").dialog({
                position: {
                    my: "left top", // add percentage offsets
                    at: changeAtLeft + " " + changeAtTop,
                    of: $(".boxCAMSVG")
                }
            });

            console.log($('#dialogInteractionEdge').dialog('option', 'position'));

            $("#dialogInteractionEdge").dialog("open");
        }

        CAM.draw();
    }
});


$(document).on("click", "#background", function (event) {

    if (!(resetConnectorSelection() || resetNodeSelection())) {
        const positionClick = {
            x: (event.clientX - $("#CAMSVG").position().left), // / zoomScale,
            y: (event.clientY - $("#CAMSVG").position().top), // / zoomScale
        }

        const isNearby = CAM.getElementNearby(positionClick);
        if (!isNearby) {
            CAM.addElement(new NodeCAM(0, " ", positionClick, 1, 1, 1));
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