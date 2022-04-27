/* !!! RENAME within code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
// necessary conditions to save CAM
var ConNumNodes = config.ConNumNodes; // # of nodes

// stop / breaklines in text:
// > maximum number of characters:
var MaxLengthWords = config.MaxLengthWords; // allow not more than X characters


/* DEFAULT values */
// if no arrows closeness to node
var DistanceArrows = 40;

// hide all researcher functionalities
$(function () {
    $('#hideResearcherButtonsNode').hide(); // hide
    $('#hideResearcherButtonsConnector').hide();
    $('#hideResearcherButtonsTop').hide();
});

// hide camera functionality
$(function () {
    $('#showCameraFeature').hide();
});

/* start url parameters */
// provide precheck IF partcipants changing URL
// !!! on server possible to send object via pst request
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());


console.log("url params: ", params);



// necessary conditions to save CAM
if (urlSearchParams.has('ConNumNodes')) {
    ConNumNodes = parseInt(urlSearchParams.get('ConNumNodes'), 10);
}

// hide connector: direction of influence + reference
if ((urlSearchParams.has('hideArrows') && urlSearchParams.get('hideArrows') === "true") ||
    config.hideArrows == true) {
    DistanceArrows = 20;
    $('#hideConnectorDirInfluence').hide();
    $(function () {
        $('#hideConnectorDirInfluence').hide();
    });
}


// hide node: no ambivalent node + reference
if ((urlSearchParams.has('hideAmbivalent') && urlSearchParams.get('hideAmbivalent') === "true") ||
    config.hideAmbivalent == true) {
    $('#hideAmvivalentNode').hide();
    $(function () {
        $('#hideAmvivalentNode').hide();
    });
}

// stop / breaklines in text:
if (urlSearchParams.has('MaxLengthWords')) {
    MaxLengthWords = parseInt(urlSearchParams.get('MaxLengthWords'), 10);
}



// show researcher buttons
if ((urlSearchParams.has('ShowResearcherButtons') && urlSearchParams.get('ShowResearcherButtons') === "true") ||
    config.ShowResearcherButtons == true) {
    $(function () {
        $('#hideResearcherButtonsNode').show();
        $('#hideResearcherButtonsConnector').show();
        $('#hideResearcherButtonsTop').show();
    });
}


// enable camera functionality
if ((urlSearchParams.has('cameraFeature') && urlSearchParams.get('cameraFeature') === "true") ||
    config.cameraFeature == true) {
    $(function () {
        $('#showCameraFeature').show();
    });
}

/* end url parameters */