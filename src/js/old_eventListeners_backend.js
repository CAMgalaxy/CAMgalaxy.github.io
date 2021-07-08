document.addEventListener('keydown', (e) => {
    console.log(e.code);
    if (e.code === "Delete" || e.code === "Backspace") {
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
        document.getElementById("inptextnode").value = CAM.currentNode.getText();
        document.getElementById("inpcommentnode").value = CAM.currentNode.getComment();
        if(CAM.currentNode.getValue() >= 4 || CAM.currentNode.getValue() == 0){
            document.getElementById("inpvaluenode").value = 0;
            $('#interactionNodeStrength').hide();
        } else{
            //$("#inpvaluenode").prop('disabled', false);
            document.getElementById("inpvaluenode").value = Math.abs(CAM.currentNode.getValue());
            $('#interactionNodeStrength').show();
        }

        $('#interactionEdge').hide();
        $('#interactionDefault').hide();
        $('#interactionNode').show();
    }

    CAM.draw();   
});



$(document).on("mouseup", ".node", function (event) {
    CAM.readyToMove = false;
    if(CAM.hasElementMoved){
        resetConnectorSelection();
        resetNodeSelection();
        CAM.hasElementMoved = false;
        CAM.draw();
    }
});

$(document).on("click", ".connector", function (event) {
    $('#interactionNode').hide();
    $('#interactionDefault').hide();
    $('#interactionEdge').show();

    resetConnectorSelection();
    resetNodeSelection();
    CAM.selectConnection($(this)[0].id)




    if (CAM.currentConnector != null) {
        //document.getElementById("interactionEdgeStrength").value = CAM.currentNode.getIntensity();
    }
    
    CAM.draw();
});



$(document).on("click", "#background", function (event) {
    $('#interactionNode').hide();
    $('#interactionEdge').hide();
    $('#interactionDefault').show();

    if (!(resetConnectorSelection() || resetNodeSelection())) {
        const positionClick = {
            x: (event.clientX - $("#CAMSVG").position().left),// / zoomScale,
            y: (event.clientY - $("#CAMSVG").position().top), // / zoomScale
        }

        const isNearby = CAM.getElementNearby(positionClick);
        if(!isNearby){
            CAM.addElement(new NodeCAM(1, 1, positionClick, 1, 1, 1));
        }
    }
    CAM.draw();
});



$(document).on("mousemove", "#CAMSVG", function (event) {
    if (CAM.readyToMove) {
        const positionClick = {
            x: (event.clientX - $("#CAMSVG").position().left), // / zoomScale,
            y: (event.clientY - $("#CAMSVG").position().top), // / zoomScale
        }
        CAM.hasElementMoved = true;
        CAM.updateElement("position", positionClick);
        CAM.draw();
    }

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