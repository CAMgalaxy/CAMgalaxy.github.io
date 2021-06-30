document.addEventListener('keydown', (e) => {
    if (e.code === "Delete") {
        if (CAM.hasSelectedNode || CAM.hasSelectedConnector) {
            CAM.deleteElement();
        }
    }
});



$(document).on("mousedown", ".node", function (event) {
    CAM.readyToMove = true;
});

$(document).on("mouseup", ".node", function (event) {
    CAM.readyToMove = false;
});


$(document).on("mousemove", "#CAMSVG", function (event) {
    if (CAM.readyToMove) {
        const positionClick = {
            x: event.clientX - $("#CAMSVG").position().left,
            y: event.clientY - $("#CAMSVG").position().top
        }
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



$(document).on("click", ".node", function (event) {
    resetConnectorSelection();
    CAM.selecteNode($(this)[0].id);
    CAM.draw();

    document.getElementById("inptextnode").value = CAM.currentNode.getText();
    document.getElementById("inpcommentnode").value = CAM.currentNode.getComment();

});





$(document).on("click", ".connector", function (event) {
    resetConnectorSelection();
    resetNodeSelection();
    CAM.selectConnection($(this)[0].id)
    CAM.draw();
});



$(document).on("click", "#background", function (event) {

    if (!(resetConnectorSelection() || resetNodeSelection())) {
        const positionClick = {
            x: event.clientX - $("#CAMSVG").position().left,
            y: event.clientY - $("#CAMSVG").position().top
        }
        CAM.addElement(new NodeCAM(1, 1, positionClick, 1, 1, 1));
    }
    CAM.draw();

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