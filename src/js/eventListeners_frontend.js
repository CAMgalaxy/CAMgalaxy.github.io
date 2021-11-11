$(function () {
    /* edge slider */
    $('#edgeSlider').on("input", function () {
        var myValueSlider = document.querySelector('#edgeSlider');

        var myGreenColorSlider = document.querySelector('.greenConnectorColorSlider');
        var myRedColorSlider = document.querySelector('.redColorConnectorSlider');

        var myRedColorTick = document.querySelector('.redColorTick');
        var myGreenColorTick = document.querySelector('.greenColorTick');

        // background-color to white
        if (myValueSlider.value <= 3) {
            myGreenColorSlider.style.backgroundColor = "white";
            myGreenColorTick.style.backgroundColor = "white";
            CAM.currentConnector.setAgreement(false);
            CAM.draw();
        } else {
            myRedColorSlider.style.backgroundColor = "white";
            myRedColorTick.style.backgroundColor = "white";
            CAM.currentConnector.setAgreement(true);
            CAM.draw();
        }

        // background-color to redish
        if (myValueSlider.value <= 3) {
            if (myValueSlider.value == 3) {
                myRedColorSlider.style.backgroundColor = "hsl(0, 100%, 70%)";
                myRedColorTick.style.backgroundColor = "hsl(0, 100%, 70%)";
                CAM.currentConnector.intensity = 1 * IncreaseSliderIntensity;
                CAM.draw();
            }
            if (myValueSlider.value == 2) {
                myRedColorSlider.style.backgroundColor = "hsl(0, 100%, 50%)";
                myRedColorTick.style.backgroundColor = "hsl(0, 100%, 50%)";
                CAM.currentConnector.intensity = 2 * IncreaseSliderIntensity;
                CAM.draw();
            }
            if (myValueSlider.value == 1) {
                myRedColorSlider.style.backgroundColor = "hsl(0, 100%, 40%)";
                myRedColorTick.style.backgroundColor = "hsl(0, 100%, 40%)";
                CAM.currentConnector.intensity = 3 * IncreaseSliderIntensity;
                CAM.draw();
            }
        }

        // background-color to greenish
        if (myValueSlider.value >= 4) {
            if (myValueSlider.value == 4) {
                myGreenColorSlider.style.backgroundColor = "hsl(110, 100%, 70%)";
                myGreenColorTick.style.backgroundColor = "hsl(110, 100%, 70%)";
                CAM.currentConnector.intensity = 1 * IncreaseSliderIntensity;
                CAM.draw();
            }
            if (myValueSlider.value == 5) {
                myGreenColorSlider.style.backgroundColor = "hsl(110, 100%, 50%)";
                myGreenColorTick.style.backgroundColor = "hsl(110, 100%, 50%)";
                CAM.currentConnector.intensity = 2 * IncreaseSliderIntensity;
                CAM.draw();
            }
            if (myValueSlider.value == 6) {
                myGreenColorSlider.style.backgroundColor = "hsl(110, 100%, 40%)";
                myGreenColorTick.style.backgroundColor = "hsl(110, 100%, 40%)";
                CAM.currentConnector.intensity = 3 * IncreaseSliderIntensity;
                CAM.draw();
            }
        }
    });



    /* node slider */
    $('#nodeSlider').on("input", function () {
        var myValueSlider = document.querySelector('#nodeSlider');

        var myGreenColorNodeSlider = document.querySelector('.greenColorNodeSlider');
        var myRedColorNodeSlider = document.querySelector('.redColorNodeSlider');

        // background-color default
        if (myValueSlider.value == 4) {
            myRedColorNodeSlider.style.backgroundColor = "hsl(0, 50%, 60%)";
            myGreenColorNodeSlider.style.backgroundColor = "hsl(110, 50%, 60%)";
        }

        // background-color to redish
        if (myValueSlider.value <= 3) {
            /*
            $('#negNodeShow').show();
            $('#ambivalentNodeShow').hide();
            $('#neutralNodeShow').hide();
            $('#posNodeShow').hide();
            */

            if (myValueSlider.value == 3) {
                myRedColorNodeSlider.style.backgroundColor = "hsl(0, 100%, 70%)";

                CAM.updateElement("value", -1);
                CAM.draw();
            }
            if (myValueSlider.value == 2) {
                myRedColorNodeSlider.style.backgroundColor = "hsl(0, 100%, 50%)";

                CAM.updateElement("value", -2);
                CAM.draw();
            }
            if (myValueSlider.value == 1) {
                myRedColorNodeSlider.style.backgroundColor = "hsl(0, 100%, 40%)";

                CAM.updateElement("value", -3);
                CAM.draw();
            }
        }

        // background-color to greensih
        if (myValueSlider.value >= 5) {
            if (myValueSlider.value == 5) {
                myGreenColorNodeSlider.style.backgroundColor = "hsl(110, 100%, 70%)";

                CAM.updateElement("value", 1);
                CAM.draw();
            }
            if (myValueSlider.value == 6) {
                myGreenColorNodeSlider.style.backgroundColor = "hsl(110, 100%, 50%)";

                CAM.updateElement("value", 2);
                CAM.draw();
            }
            if (myValueSlider.value == 7) {
                myGreenColorNodeSlider.style.backgroundColor = "hsl(110, 100%, 40%)";

                CAM.updateElement("value", 3);
                CAM.draw();
            }
        }

        // set to neutral:
        if (myValueSlider.value == 4) {
            CAM.updateElement("value", 0);
            CAM.draw();
        }
    });


    $('#checkboxAmbivalent').on("click", function (event) {
        var myValueCheckbox = document.querySelector('#checkboxAmbivalent').checked;

        if (myValueCheckbox === true) {
            toastr.info('To change the ambivalent concept again, please uncheck the box.');
            CounterChangeAmbiConcept++;
            if (CounterChangeAmbiConcept == 2) {
                $(this).off(event);
            }
        }

    });


    $('#checkboxAmbivalent').on("input", function () {

        var myValueCheckbox = document.querySelector('#checkboxAmbivalent').checked;

        if (myValueCheckbox === true) {
            document.getElementById("nodeSlider").disabled = true;
            document.getElementById("nodeSlider").value = 4;
            CAM.updateElement("value", 10);
            CAM.draw();
        } else {
            document.getElementById("nodeSlider").disabled = false;
            document.getElementById("nodeSlider").value = 4;
            CAM.updateElement("value", 0);
            CAM.draw();
        }
    });




    /* */
    $("#dialogReference").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: false,
        resizable: false,
        draggable: true,
        width: 400,
        maxWidth: 400,
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        },
        open: function (event, ui) {
            $(".ui-dialog-titlebar").show(); // hide titlebar            
            console.log('dialog got open');
        },
        close: function (event, ui) {
            console.log('dialog got closed');
            closeTab();
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


    /* 
    buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        },
    */

    $("#dialogInteractionEdge").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: false,
        resizable: false,
        draggable: true,
        width: 310,
        maxWidth: 310,
        height: 'auto',
        open: function (event, ui) {
            $(".ui-dialog-titlebar").hide(); // hide titlebar
            $(this).dialog({
                draggable: false
            }).parent().draggable(); // see: https://stackoverflow.com/questions/6410720/jquery-ui-dialog-draggable-on-entire-dialog-not-just-title

            CAM.currentConnector.isSelected = true;

            console.log('dialog connector got open');
            $('.ui-widget-overlay').on('click', function () { // .bind
                $("#dialogInteractionEdge").dialog('close');
            });

            CAM.currentConnector.enterLog({
                type: "selected",
                value: true
            });
        },
        close: function (event, ui) {
            console.log('dialog got closed');

            // if connector got deleted
            if (CAM.currentConnector !== null) {
                CAM.currentConnector.isSelected = false;
                CAM.draw();

                if (CAM.currentConnector.agreement) {
                    CAM.currentConnector.enterLog({
                        type: "change intensity of connector",
                        value: CAM.currentConnector.intensity
                    });
                } else {
                    CAM.currentConnector.enterLog({
                        type: "change intensity of connector",
                        value: CAM.currentConnector.intensity * -1
                    });
                }

                CAM.currentConnector.enterLog({
                    type: "selected",
                    value: false
                });
            }

        },
        position: {
            my: "right-0.5% top+3.5%", // add percentage offsets
            at: "right-0.5% top+3.5%",
            of: $(".boxCAMSVG")
        }
    });


    $("#dialogInteractionNode").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: false,
        resizable: false,
        draggable: true,
        width: 310,
        maxWidth: 310,
        open: function (event, ui) {
            $(".ui-dialog-titlebar").hide(); // hide titlebar
            $(this).dialog({
                draggable: false
            }).parent().draggable();

            CAM.currentNode.isSelected = true;

            CAM.currentNode.enterLog({
                type: "selected",
                value: true
            });

            console.log('dialog got open');

            //setTimeout("$('#dialogInteractionNode').dialog('close')",5000);

            $('.ui-widget-overlay').on('click', function () {
                $("#dialogInteractionNode").dialog('close');
            });

        },
        close: function (event, ui) {
            console.log('dialog got closed');

            /*        */
            // if node got deleted
            if (CAM.currentNode !== null) {
                CAM.currentNode.isSelected = false;
                CAM.draw();

                // adjust event Log
                CAM.currentNode.enterLog({
                    type: "text",
                    value: CAM.currentNode.getText()
                });

                CAM.currentNode.enterLog({
                    type: "value",
                    value: CAM.currentNode.getValue()
                });

                CAM.currentNode.enterLog({
                    type: "comment",
                    value: CAM.currentNode.getComment()
                });

                CAM.currentNode.enterLog({
                    type: "selected",
                    value: false
                });
            }


        },
        position: {
            my: "right-0.5% top+3.5%", // add percentage offsets
            at: "right-0.5% top+3.5%",
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

            CAM.updateElement("text", this.value);
            CAM.draw();
        } else {
            alert("Please do not use more than" + MaxLengthWords + " characters for a single node!\nInstead, please draw several connected nodes.");
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
        CAM.currentNode.enterLog({
            type: "node was deleted",
            value: -99
        });
        CAM.deleteElement();

        $("#dialogInteractionNode").dialog('close');
    });


    /* interactive components: EDGE */
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
        CAM.currentConnector.enterLog({
            type: "connector was deleted",
            value: -99
        });
        CAM.deleteElement();

        $("#dialogInteractionEdge").dialog('close'); // close pop-up
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
        var CAMnodes = CAM.nodes.filter(element => element.isActive === true);
        var CAMconnectors = CAM.connectors.filter(element => element.isActive === true);

        // every concept should include text
        var CAMnodesText = CAMnodes.filter(element => element.text.length === 0);
        console.log(CAMnodesText)
        if (CAMnodesText.length > 0) {
            alert(CAMnodesText.length + " concepts are empty." + "\nPlease return to your Cognitive-Affective Map and add text to the empty concepts.");
            return false;
        }
        // necessary # of concepts
        if (CAMnodes.length < ConNumNodes) {
            alert("Please draw at least " + ConNumNodes + " concepts. \nPlease return to your Cognitive-Affective Map and add additional concepts to it.");
            return false;
        } else if ((CAMnodes.length - 1) > CAMconnectors.length) { // CAMnodes.every(element => element.isConnected !== true)
            /* 
            test:
            necessary condition -> everything is connected using simple checks (still possible that there are X non-connected components) 
            */
            console.log("CAMconnectors.length: ", CAMconnectors.length);
            console.log("CAM.nodes.length: ", CAMnodes.length);

            // console.log(CAMnodes.every(element => element.isConnected !== true));
            alert("Please connect all your concepts within your Cognitive-Affective Map. \nPlease return to your Cognitive-Affective Map and add additional connections to it.");
            return false;
        } else {
            addElementsCy();
            var ResbfsAl = bfsAlgorithm("#" + cy.nodes()[0].id());
            console.log("num of distinct components of CAM: ", ResbfsAl);

            if (ResbfsAl !== 1) {
                alert("Please connect all your " + ResbfsAl + " distinct groups of concepts within your Cognitive-Affective Map.\nPlease return to your Cognitive-Affective Map and add additional connections to it.");
                return false;
            } else {
                toastr.success('Your CAM data has been sent to the sever. Thank you for participating!');
                // append data to URL
                if (ADAPTIVESTUDYlog) {
                    alert('append data to URL - !!! include');
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

    var img = document.createElement("img");
    img.src = a.href;


    console.log(a.href);
    //$(location).prop('href', 'http://stackoverflow.com')
    //window.location.replace(a.href);
   // window.open(a.href, "_blank");
    //window.open(a.href, "theFrame");
    //window.open(a.href, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=400,left=650,width=1300,height=800");

    a.click();

    /*
    > https://stackoverflow.com/questions/3975499/convert-svg-to-image-jpeg-png-etc-in-the-browser
    canvg('canvas', $("#editor").html());
    */
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
    downloadCAMdata(JSON.stringify(CAM), "CAMdataJSON-" + CAM.idCAM + ".txt", "text/plain");

    toastr.info('You can save your CAM as a data file (JSON file).');
}


/* > upload CAM as JSON file
adjusted: https://stackoverflow.com/questions/36127648/uploading-a-json-file-and-using-it
https://stackoverflow.com/questions/23344776/how-to-access-data-of-uploaded-json-file
https://stackoverflow.com/questions/31746837/reading-uploaded-text-file-contents-in-html */
$(function () {
    $('#fileToLoad').on('change', async (event) => {
        // delete former CAM
        CAM.connectors = [];
        CAM.nodes = [];
        CAM.draw();
        console.log("complete CAM has been deleted");

        /* get file list */
        var fileToLoad = document.getElementById("fileToLoad").files; // [0]
        //console.log("file to load: ", fileToLoad)

        /* parse to JSON file */
        var jsonObj = await fileToJSON(fileToLoad);
        console.log("file to load parsed: ", jsonObj);
        //console.log("file to load parsed length nodes: ", jsonObj.nodes.length);

        /* draw CAM */
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
    });
});

function fileToJSON(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = event => resolve(JSON.parse(event.target.result))
        fileReader.onerror = error => reject(error)
        fileReader.readAsText(file.item(0))
    })
}


$(function () {
    $("#deleteCAM").on("click", () => {
        let confirmdel = confirm("Do you really want to delete your CAM? No data will be saved on the server.");
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


        /* reduce size of the CAM object (or use only post-processed data)
        see: https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
        */
        /*
        var dataCAM = CAM;

        dataCAM.nodes.forEach(elt => {
           elt.eventLog = [];
        });
        dataCAM.connectors.forEach(elt => {
            elt.eventLog = [];
         });
*/

/*
https://stackoverflow.com/questions/3975499/convert-svg-to-image-jpeg-png-etc-in-the-browser

    // the canvg call that takes the svg xml and converts it to a canvas
    canvg('canvas', $("#CAMSVG")[0].outerHTML);
    // the canvas calls to output a png
    var canvas = document.getElementById("canvas");
    var imgage = canvas.toDataURL("image/png");
    // do what you want with the base64, write to screen, post to server, etc...
         console.log(imgage);
             <script type="text/javascript" src="https://unpkg.com/canvg@3.0.4/lib/umd.js"></script>
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