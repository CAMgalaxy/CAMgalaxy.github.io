


$(function () {
    
    $('#interactionNode').hide();
    $('#interactionEdge').hide();


    /* delete later: */
    $("#deleteNode").on("click", (evt) => {
        console.log("Deleted using botton");
        CAM.deleteElement();
    });

    $("#deleteEdge").on("click", (evt) => {
        console.log("Deleted using botton");
        CAM.deleteElement();
    });



   /* ... */


           //CAM.currentConnector.setAgreement(false)



   

    /* single buttons: */
    $("#deleteCAM").on("click", () => {
        let confirmdel = confirm("Do you really want to delete your CAM?");
        if (confirmdel == true) {
            CAM.elements = [];
            console.log("complete CAM has been deleted");
            CAM.draw();
        }
    });

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

    $('#inpvaluenode').on("input", function () {
        if (CAM.currentNode != null) {
            if (CAM.currentNode.getValue() > 0 && CAM.currentNode.getValue() < 10) {
                CAM.updateElement("value", this.value);
                console.log("value updated by ", this.value);
            }
            if (CAM.currentNode.getValue() < 0) {
                CAM.updateElement("value", this.value * -1);
                console.log("value updated by ", this.value);
            }
            CAM.draw();
        }
    });



    $('#inptextnode').on("input", function () {
        console.log(this.value);
        CAM.updateElement("text", this.value);
        CAM.draw();
    });

    $('#inpcommentnode').on("input", function () {
        console.log(this.value);
        CAM.updateElement("comment", this.value);
    });
})


/* single buttons: */
/* > save CAM object as JSON file
http://www.4codev.com/javascript/download-save-json-content-to-local-file-in-javascript-idpx473668115863369846.html 
*/
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
/* > save SVG object as svg file
adjusted: https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
*/
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