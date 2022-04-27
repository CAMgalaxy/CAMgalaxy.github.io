/* default CAM which will be redrawn if CAM is deleted */

function defaultCAM() {
    CAM.addElement(new NodeCAM(3, "the middleman (centered node)", {
        x: 650,
        y: 400
    }, true, true, true));

    CAM.addElement(new NodeCAM(1, "I cannot be moved or deleted", {
        x: 300,
        y: 100
    }, false, false, true));

    CAM.addElement(new NodeCAM(-1, "I cannot be moved but deleted", {
        x: 300,
        y: 700
    }, false, true, true));

    CAM.addElement(new NodeCAM(0, "Neutral concept (cannot change text)", {
        x: 1000,
        y: 100
    }, true, true, false));

    CAM.addElement(new NodeCAM(10, "Ambivalent concept", {
        x: 1000,
        y: 700
    }, true, true, true));




    var connector1 = new ConnectorCAM();
    connector1.establishConnection(CAM.nodes[0], CAM.nodes[1], IncreaseSliderIntensity, true);
    connector1.value = 1
    CAM.addElement(connector1);

    var connector2 = new ConnectorCAM();
    connector2.establishConnection(CAM.nodes[0], CAM.nodes[2], IncreaseSliderIntensity, false);
    connector2.value = 1
    CAM.addElement(connector2);

    var connector3 = new ConnectorCAM();
    connector3.establishConnection(CAM.nodes[0], CAM.nodes[3], IncreaseSliderIntensity, true);
    connector3.value = 1
    CAM.addElement(connector3);
    connector3.isBidirectional = false;

    var connector4 = new ConnectorCAM();
    connector4.establishConnection(CAM.nodes[0], CAM.nodes[4], IncreaseSliderIntensity, true);
    connector4.value = -1
    CAM.addElement(connector4);


    CAM.draw();

}