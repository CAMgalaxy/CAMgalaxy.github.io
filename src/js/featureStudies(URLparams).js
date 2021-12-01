/* !!! RENAME within code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
// necessary conditions to save CAM
var ConNumNodes = config.ConNumNodes; // # of nodes

// stop / breaklines in text:
// > maximum number of characters:
var MaxLengthWords = config.MaxLengthWords; // allow not more than X characters
var MaxLengthChars = config.MaxLengthChars; // allow not more than X characters

/* DEFAULT values */
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

// hide connector: direction of influence
if ((urlSearchParams.has('HideConDirInf') && urlSearchParams.get('HideConDirInf') === "true" ) ||
config.HideConDirInf == true) {
    DistanceArrows = 20;
    $(function () {
        $('#hideConnectorDirInfluence').hide();
    });
    config.HideConDirInf = true;
}else if ((urlSearchParams.has('HideConDirInf') && urlSearchParams.get('HideConDirInf') === "false" ) ||
config.HideConDirInf == false) {
// if no arrows closeness to node
var DistanceArrows = 40;
    $(function () {
        $('#hideConnectorDirInfluence').show();
    });
    config.HideConDirInf = false;
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
}else if ((urlSearchParams.has('ShowResearcherButtons') && urlSearchParams.get('ShowResearcherButtons') === "false") ||
config.ShowResearcherButtons == false) {
$(function () {
    // hide all researcher functionalities
    $('#hideResearcherButtonsNode').hide(); // hide
    $('#hideResearcherButtonsConnector').hide();
    $('#hideResearcherButtonsTop').hide();
});
}


// enable camera functionality
if((urlSearchParams.has('cameraFeature') && urlSearchParams.get('cameraFeature') === "true") ||
    config.cameraFeature == true) {
    $(function () {
        $('#showCameraFeature').show();
    });
}else if((urlSearchParams.has('cameraFeature') && urlSearchParams.get('cameraFeature') === "false") ||
config.cameraFeature == false) {
$(function () {
    $('#showCameraFeature').hide();
});
}

/* end url parameters */