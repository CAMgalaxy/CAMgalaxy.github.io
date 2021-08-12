/* *** INTERACTION PANEL RIGHT *** */
$(function () {
    /* default setting of interaction panel: */
    $('#interactionNode').hide();
    $('#interactionEdge').hide();
    $('#interactionDefault').show();

    /* interactive components: NODE */
    // > text
    $('#inptextnode').on("input", function () {
        console.log(this.value);
        CAM.updateElement("text", this.value);
        CAM.draw();
    });

    // > type
    $("#setnode_positve").on("click", () => {
        CAM.updateElement("value", 1);
        CAM.draw();
    });
    $("#setnode_negative").on("click", () => {
        CAM.updateElement("value", -1);
        CAM.draw();
    });
    $("#setnode_ambivalent").on("click", () => {
        CAM.updateElement("value", 10);
        CAM.draw();
    });
    $("#setnode_neutral").on("click", () => {
        CAM.updateElement("value", 0);
        CAM.draw();
    });

    // > strength
    $('#inpvaluenode').on("input", function () {
        var myRange = document.querySelector('#inpvaluenode');
        var myValue = document.querySelector('#myValueNode');

        if (myRange.value === "1") {
            myValue.innerHTML = "low";
        } else if (myRange.value === "2") {
            myValue.innerHTML = "middle";
        } else if (myRange.value === "3") {
            myValue.innerHTML = "high";
        }
    });

    $('#inpvaluenode').on("input", function () {
        console.log(this.value);
        if (CAM.currentNode != null) {
            if (CAM.currentNode.getValue() > 0 && CAM.currentNode.getValue() < 10) {
                CAM.updateElement("value", this.value);
            }
            if (CAM.currentNode.getValue() < 0) {
                CAM.updateElement("value", this.value * -1);
            }
            CAM.draw();
        }
    });

    // > comment
    $('#inpcommentnode').on("input", function () {
        console.log(this.value);
        CAM.updateElement("comment", this.value);
        CAM.draw();
    });

    // > delete
    $("#deleteNode").on("click", (evt) => {
        console.log("Deleted using botton");
        CAM.deleteElement();
    });


    /* interactive components: EDGE */
    // > type of edge
    $("#typeEdgeAgree").on("click", () => {
        CAM.currentConnector.setAgreement(true);
        CAM.draw();
    });

    $("#typeEdgeDisagree").on("click", () => {
        CAM.currentConnector.setAgreement(false);
        CAM.draw();
    });

    // > strength
    $('#inpValueEdge').on("input", function () {
        var myRange = document.querySelector('#inpValueEdge');
        var myValue = document.querySelector('#myValueEdge');

        if (myRange.value === "1") {
            myValue.innerHTML = "low";
        } else if (myRange.value === "2") {
            myValue.innerHTML = "middle";
        } else if (myRange.value === "3") {
            myValue.innerHTML = "high";
        }
    });

    $('#inpValueEdge').on("input", function () {
        console.log(this.value);
        if (CAM.currentConnector != null) {
            CAM.currentConnector.intensity = this.value * 3
            CAM.draw();
        }
    });

    // > PLACEHOLDER: direction of influence

    // > delete
    $("#deleteEdge").on("click", (evt) => {
        console.log("Deleted using botton");
        CAM.deleteElement();
    });

})

/* interactive components: INFORMATION */
// > open single div using navigation bar
function openTab(evt, QRname) {
    $('#informationDefault').hide();

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(QRname).style.display = "block";
    evt.currentTarget.className += " active";
}

// > closing active div clicking on cross topright
function closeTab() {
    $('#informationDefault').show();

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}

/* *** BUTTON TOPS *** */
// > PLACEHOLDER: save CAM

/* > save SVG object as svg file
adjusted: https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an */
function downloadCAMsvg(svgEl, fileName) {
    svgEl.setAttribute("xmlns", svgns);
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {
        type: "image/svg+xml;charset=utf-8"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(svgBlob);
    a.download = fileName;
    a.click();
}

function onDownloadSVGfile() {
    console.log("CAM picture (svg) has been saved");
    downloadCAMsvg(CAMSVG, "CAMsvg-" + CAM.idCAM + ".svg");
}


/* > save CAM object as JSON file
http://www.4codev.com/javascript/download-save-json-content-to-local-file-in-javascript-idpx473668115863369846.html */
function downloadCAMdata(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], {
        type: contentType
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function onDownloadCAMdata() {
    console.log("CAM data has been saved");
    downloadCAMdata(JSON.stringify(CAM), "CAMdata-" + CAM.idCAM + ".json", "text/plain");
}


/* > upload CAM as JSON file
adjusted: https://stackoverflow.com/questions/36127648/uploading-a-json-file-and-using-it
https://stackoverflow.com/questions/23344776/how-to-access-data-of-uploaded-json-file */
async function uploadCAMdataMain() {
    // ! delete complete CAM if you import complete CAM
    // > if CAM is updated
    CAM.connectors = [];
    CAM.nodes = [];
    console.log("complete CAM has been deleted");


    // upload file
    var files = document.getElementById('getFile').files;

    // check file
    if (files.length <= 0) {
        return false;
    }
    if (files[0].type.search(/json/i) === -1) {
        alert("You have not uploaded a JSON file.");
        return false;
    }

    // load json Object
    console.log("await 1");
    const jsonObj = await fileToJSON(files);
    //console.log(jsonObj);

    // draw CAM
    console.log("await 2");
    await drawCAMdata(jsonObj);

    document.getElementById("getFile").value = "";
    return;
}

async function fileToJSON(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = event => resolve(JSON.parse(event.target.result))
        fileReader.onerror = error => reject(error)
        fileReader.readAsText(file.item(0))
    })
}

async function drawCAMdata(jsonObj) {
    // draw nodes
    arrayIDs = [];
    for (var i = 0; i < jsonObj.nodes.length; i++) {
        const elementNode = jsonObj.nodes[i];
        console.log(elementNode);

        CAM.addElement(new NodeCAM(elementNode.value, elementNode.text, {
            x: elementNode.position.x,
            y: elementNode.position.y
        }, false, true));

        CAM.nodes[i].id = elementNode.id; // add ID of former node
        CAM.nodes[i].isDraggable = true; // moveable
        arrayIDs.push(elementNode.id);
    }

    // draw connectors
    for (var i = 0; i < jsonObj.connectors.length; i++) {
        //CAM.nodes.match(elt => elt.id ===     jsonObj.connectors[0].motherID)
        const elementConnector = jsonObj.connectors[i];
        console.log(elementConnector);
        var connector1 = new ConnectorCAM();

        connector1.establishConnection(CAM.nodes[arrayIDs.indexOf(elementConnector.motherID)], CAM.nodes[arrayIDs.indexOf(elementConnector.daughterID)],
            elementConnector.intensity, elementConnector.agreement);
        CAM.addElement(connector1);
    }

    // draw CAM
    CAM.draw();
    return;
}


// > delete complete CAM
$(function () {
    $("#deleteCAM").on("click", () => {
        let confirmdel = confirm("Do you really want to delete your CAM?");
        if (confirmdel == true) {
            CAM.connectors = [];
            CAM.nodes = [];

            console.log("complete CAM has been deleted");
            CAM.draw();
        }
    });
})
















/* old approach upload CAM as JSON file
    $("#buttonupload").on("click", () => {
        console.log("ok");

        document.getElementById("buttonupload").onclick = async () => {
            try {
                //some code here which call some async function (not related so not writing here) 
                alert('clicked.');
            } catch (e) {
                log(e);
            }
        };
    });
    */