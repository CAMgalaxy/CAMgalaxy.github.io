function hideallInteractions() {
    $('#interactionDefault').hide();
    $('#interactionNode').hide();
    $('#interactionEdge').hide();
}



document.addEventListener('keydown', (e) => {
    console.log(e.code);
    if (e.code === "Delete" || e.code === "Backspace") { // change!
        if (CAM.hasSelectedNode || CAM.hasSelectedConnector) {
            CAM.deleteElement();
        }
    }
});


$(document).on("mousedown", ".node", function (event) {
    CAM.readyToMove = true;
    resetConnectorSelection();
    CAM.selecteNode($(this)[0].id);

    if (CAM.currentNode != null) {
        // get text of current node
        document.getElementById("inptextnode").value = CAM.currentNode.getText();
        // get comment of current node
        document.getElementById("inpcommentnode").value = CAM.currentNode.getComment();
        // hide / show slider for strength
        if (CAM.currentNode.getValue() >= 4 || CAM.currentNode.getValue() == 0) {
            document.getElementById("inpvaluenode").value = 0;
            $('#interactionNodeStrength').hide();
            // $("#inpvaluenode").prop('disabled', true);

        } else {
            document.getElementById("inpvaluenode").value = Math.abs(CAM.currentNode.getValue());
            $('#interactionNodeStrength').show();
        }
        // get current strength of valence
        var myRange = document.querySelector('#inpvaluenode');
        var myValue = document.querySelector('#myValueNode');
        if (myRange.value === "1") {
            myValue.innerHTML = "low";
        } else if (myRange.value === "2") {
            myValue.innerHTML = "middle";
        } else if (myRange.value === "3") {
            myValue.innerHTML = "high";
        }

        hideallInteractions();
        $('#interactionNode').show();
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

$(document).on("click", ".connector", function (event) {
    resetConnectorSelection();
    resetNodeSelection();
    CAM.selectConnection($(this)[0].id)

    hideallInteractions();
    $('#interactionEdge').show();

    CAM.draw();
});

$(document).on("click", ".outer-connector", function (event) {
    resetConnectorSelection();
    resetNodeSelection();
    CAM.selectConnection($(this)[0].id)

    hideallInteractions();
    $('#interactionEdge').show();
    CAM.draw();
});



$(document).on("mousedown", ".connector, .outer-connector", function (event) {
    resetConnectorSelection();
    resetNodeSelection();
    CAM.selectConnection($(this)[0].id);

    if (CAM.currentConnector != null) {
        // get current strength of connection
        var myRange = document.querySelector('#inpValueEdge');
        var myValue = document.querySelector('#myValueEdge');

        if (myRange.value === "1") {
            myValue.innerHTML = "low";
        } else if (myRange.value === "2") {
            myValue.innerHTML = "middle";
        } else if (myRange.value === "3") {
            myValue.innerHTML = "high";
        }


        hideallInteractions();
        $('#interactionEdge').show();
        console.log("AAAA 123")
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
            CAM.addElement(new NodeCAM(1, 1, positionClick, 1, 1, 1));
        }
    }

    hideallInteractions();
    $('#interactionDefault').show();
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