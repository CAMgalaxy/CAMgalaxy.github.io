/* !!! RENAME within code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
// necessary conditions to save CAM
var ConNumNodes = config.ConNumNodes; // # of nodes
var ConConnected = config.ConConnected;

// stop / breaklines in text:
// > maximum number of characters:
var MaxLengthWords = config.MaxLengthWords; // allow not more than X characters


/* DEFAULT values */
// if no arrows closeness to node
var DistanceArrows = 40;



/* start url parameters */
// provide precheck IF partcipants changing URL
// !!! on server possible to send object via pst request
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());


console.log("url params: ", params);


if (Object.keys(params).length != 0) {
    // necessary conditions to save CAM
    if (urlSearchParams.has('ConNumNodes')) {
        ConNumNodes = parseInt(urlSearchParams.get('ConNumNodes'), 10);
    }
    if (urlSearchParams.has('ConConnected') && urlSearchParams.get('HideConDirInf') === "false") {
        ConConnected = false;
    }

    // stop / breaklines in text:
    if (urlSearchParams.has('MaxLengthWords')) {
        MaxLengthWords = parseInt(urlSearchParams.get('MaxLengthWords'), 10);
    }

    // hide connector: direction of influence
    if (urlSearchParams.has('HideConDirInf') && urlSearchParams.get('HideConDirInf') === "true") {
        DistanceArrows = 20;
        $(function () {
            $('#hideConnectorDirInfluence').hide();
        });
    }

    // show researcher buttons
    if (urlSearchParams.has('ShowResearcherButtons') && urlSearchParams.get('ShowResearcherButtons') === "true") {
        $(function () {
            $('#hideResearcherButtonsNode').show();
            $('#hideResearcherButtonsConnector').show();
            $('#hideResearcherButtonsTop').show();
        });
    } else {
        // else hide all researcher functionalities
        $(function () {
            $('#hideResearcherButtonsNode').hide(); // hide
            $('#hideResearcherButtonsConnector').hide();
            $('#hideResearcherButtonsTop').hide();
        });
    }
}
/* end url parameters */