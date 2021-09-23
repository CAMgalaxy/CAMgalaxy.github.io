$(function () {
    $("#dialogReference").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: false,
        resizable: true,
        minWidth: 300,
        buttons: {  
            Close: function() {$(this).dialog("close");}  
         }, 
        open: function( event, ui ) {
            console.log('dialog got open');
        },
        close: function( event, ui ) {
            console.log('dialog got closed');
        },
        position: {
            my: "right-1% top+5%", // add percentage offsets
            at: "right-1% top+5%",
            of: $(".boxCAMSVG")
        }
    });

    // next add the onclick handler
    $("#quickref").on("click", () => {
        $("#dialogReference").dialog("open");
        return false;
    });



    $("#dialogInteractionEdge").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: false,
        resizable: true,
        minWidth: 400,
        buttons: {  
            Close: function() {$(this).dialog("close");}  
         }, 
        open: function( event, ui ) {
            console.log('dialog got open');
            $('.ui-widget-overlay').bind('click', function()
            { 
                $("#dialogInteractionEdge").dialog('close'); 
            }); 
        },
        close: function( event, ui ) {
            console.log('dialog got closed');
        },
        position: {
            my: "center", // add percentage offsets
            at: "center",
            of: $(".boxCAMSVG")
        }
    });




    $("#dialogInteractionNode").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: false,
        resizable: true,
        minWidth: 400,
        buttons: {  
            Close: function() {$(this).dialog("close");}  
         }, 
        open: function( event, ui ) {
            console.log('dialog got open');
            $('.ui-widget-overlay').bind('click', function()
            { 
                $("#dialogInteractionNode").dialog('close'); 
            }); 

        },
        close: function( event, ui ) {
            console.log('dialog got closed');
        },
        position: {
            my: "center", // add percentage offsets
            at: "center",
            of: $(".boxCAMSVG")
        }
    });
});



/* *** INTERACTION PANEL RIGHT *** */
$(function () {
    /* default setting of interaction panel: */


    /* interactive components: NODE */
    // > text
    $('#inptextnode').on("input", function () {
        if (this.value.length < MaxLengthWords) {
            console.log(this.value);
            CAM.updateElement("text", this.value);
            CAM.draw();
        } else {
            alert("Please do not use more than 50 characters for a single node!\nInstead, please draw several connected nodes.");
        }
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
            CAM.currentConnector.intensity = this.value * 4
            CAM.draw();
        }
    });

    // > PLACEHOLDER: direction of influence
    $("#bidirectional").on("click", () => {
        if (CAM.currentConnector != null) {
            const mother = CAM.getNodeById(CAM.currentConnector.motherID);
            const daughter = CAM.getNodeById(CAM.currentConnector.daughterID);
            CAM.currentConnector.makeBidirectionalConnection(mother, daughter);
            CAM.draw();
        }
    });

    $("#monodirectional").on("click", () => {
        if (CAM.currentConnector != null) {
            const mother = CAM.getNodeById(CAM.currentConnector.motherID);
            const daughter = CAM.getNodeById(CAM.currentConnector.daughterID);
            CAM.currentConnector.makeUnidirectionalConnection(mother, daughter);
            CAM.draw();
            console.log(123);
        }
    });

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
/* > save CAM on server + necessary conditions
... */
$(function () {
    $("#saveCAM").on("click", () => {
        const CAMnodes = CAM.nodes.filter(element => element.isActive === true);
        const CAMconnectors = CAM.connectors.filter(element => element.isActive === true);

        // necessary # of concepts
        if (CAMnodes.length < ConNumNodes) {
            alert("Please draw at least " + ConNumNodes + " concepts. \nPlease return to your Cognitive-Affective Map and add additional concepts to it.");
        } else if (CAMconnectors.length < (CAM.nodes.length - 1)) { // CAMnodes.every(element => element.isConnected !== true)
            /* 
            test:
            necessary condition -> everything is connected using simple checks (still possible that there are X non-connected components) 
            */
            //console.log(CAMconnectors.length < (CAM.nodes.length - 1), CAMconnectors.length, (CAM.nodes.length - 1));
            //console.log(CAMnodes.every(element => element.isConnected !== true));

            alert("Please connect all your concepts within your Cognitive-Affective Map. \nPlease return to your Cognitive-Affective Map and add additional connections to it.");
        } else {
            addElementsCy();
            var ResbfsAl = bfsAlgorithm("#" + cy.nodes()[0].id());
            console.log("num of distinct components of CAM: ", ResbfsAl);

            if (ResbfsAl !== 1) {
                alert("Please connect all your " + ResbfsAl + " distinct groups of concepts within your Cognitive-Affective Map.\nPlease return to your Cognitive-Affective Map and add additional connections to it.");
            } else {
                toastr.success('Your CAM data has been sent to the sever. Thank you for participating!');
                // append data to URL
                if (ADAPTIVESTUDYlog) {
                    alert('append data to URL');
                }
            }
        }
    });
})



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

    toastr.info('You can save your CAM as a picture (svg file).');
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

    toastr.info('You can save your CAM as a data file (JSON file).');
}


/* > upload CAM as JSON file
adjusted: https://stackoverflow.com/questions/36127648/uploading-a-json-file-and-using-it
https://stackoverflow.com/questions/23344776/how-to-access-data-of-uploaded-json-file */
async function uploadCAMdataMain() {
    toastr.info('You can upload your CAM from a data file (JSON file).');

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
    $("#deleteCAM").on("mouseover", () => {
        toastr.warning('You can delete your complete CAM if you confirm the message.');
    });
})

$(function () {
    $("#deleteCAM").on("click", () => {
        let confirmdel = confirm("Do you really want to delete your CAM?");
        if (confirmdel == true) {
            CAM.connectors = [];
            CAM.nodes = [];

            toastr.error('You CAM has been deleted. No data will be saved on the server.');

            console.log("complete CAM has been deleted");
            CAM.draw();
        }
    });
})


$(function () {
    $("#ResErasabilityNode").on("click", (evt) => {
        if (CAM.currentNode != null) {
            if (CAM.currentNode.isDeletable == true) {
                CAM.currentNode.setIsDeletable(false);
                toastr.info('The node is now not deletable.');
            } else if (CAM.currentNode.isDeletable == false) {
                CAM.currentNode.setIsDeletable(true);
                toastr.info('The node is now deletable.');
            }
        }
    });

    $("#ResErasabilityConnector").on("click", (evt) => {
        if (CAM.currentConnector != null) {
            if (CAM.currentConnector.isDeletable == true) {
                CAM.currentConnector.setIsDeletable(false);
                toastr.info('The connector is now not deletable.');
            } else if (CAM.currentConnector.isDeletable == false) {
                CAM.currentConnector.setIsDeletable(true);
                toastr.info('The connector is now deletable.');
            }
        }
    });

    $("#ResManoeuvrability").on("click", (evt) => {
        if (CAM.currentNode != null) {
            if (CAM.currentNode.isDraggable == true) {
                CAM.currentNode.setIsDraggable(false);
                toastr.info('The node is now not draggable.');
            } else if (CAM.currentNode.isDraggable == false) {
                CAM.currentNode.setIsDraggable(true);
                toastr.info('The node is now draggable.');
            }
        }
    });

})





function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";

    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return uri + separator + key + "=" + value;
    }
}

$(function () {
    $("#gen").on("click", (evt) => {

        var dataCAM = CAM;

        /* reduce size of the CAM object (or use only post-processed data)
        see: https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
        */
        /*
        dataCAM.nodes.forEach(elt => {
           elt.eventLog = [];
        });
        dataCAM.connectors.forEach(elt => {
            elt.eventLog = [];
         });
*/

        var a = getActiveListNodes();
        a.unshift(CAM.idCAM);
        console.log(a);
        //You can reload the url like so
        var encodedCAM = Base64.encode(JSON.stringify(a));
        var newUrl = updateQueryStringParameter(ADAPTIVESTUDYurl, "encoded", encodedCAM);

        var decodedCAM = Base64.decode(encodedCAM);
        console.log("encode: ", encodedCAM);
        console.log("decode: ", decodedCAM);

        console.log("URL:", newUrl);

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