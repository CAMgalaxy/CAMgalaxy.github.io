/* default CAM which will be redrawn if CAM is deleted */
function shuffle(queslist) {
    let array_emp = [];
    for (var i = 0; i < queslist.length; i++) {
      array_emp.push(i);
    }
  
    let j, x;
    for (i = array_emp.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array_emp[i];
      array_emp[i] = array_emp[j];
      array_emp[j] = x;
    }
    return array_emp;
  }

const ConceptsCAM = ["positive feelings", "negative feelings", 
"trust in policitical institutions",
"perceived risks", "perceived benefits"];

const index_ConceptsCAM = shuffle(ConceptsCAM);
console.log("index_ConceptsCAM:", index_ConceptsCAM);


function defaultCAM() {
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
    connector1.establishConnection(CAM.nodes[0], CAM.nodes[1], IncreaseSliderIntensity, false);
    connector1.value = 1;
    CAM.addElement(connector1);

    var connector2 = new ConnectorCAM();
    connector2.establishConnection(CAM.nodes[0], CAM.nodes[2], IncreaseSliderIntensity, true);
    connector2.value = 1;
    CAM.addElement(connector2);

    var connector3 = new ConnectorCAM();
    connector3.establishConnection(CAM.nodes[0], CAM.nodes[3], IncreaseSliderIntensity, true);
    connector3.value = 1;
    CAM.addElement(connector3);
    connector3.isBidirectional = false;



    CAM.draw();
}