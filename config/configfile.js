/* default values */
var config = {
    CAMproject: "proj_" + uuid.v4(), // necessary for server (see ERM)
    ConNumNodes: 3, // number of nodes necessary to draw
    hideArrows: false, // if false = possible to draw arrows
    hideAmbivalent: false, // if false = possible to draw ambivalent node
    showSliderAgreementOnly: false, // show only slider for agreement (+1 - +3)
    MaxLengthWords: 3, // maximum number of words for each concept
    MaxLengthChars: 30, // maximum number of characters for each concept
    LengthSentence: 16, // include breaklines if >= X characters
    LengthWords: 12, // include breaklines after each word with cumsum >= X characters
    ShowResearcherButtons: true, // if true = show researcher functionalities
    cameraFeature: false, // include camera / splotlight feature to move screen
    fullScreen: false, // if true = study in fullscreen mode + paradata
    AdaptiveStudy: false, // run as adaptive study 
    ADAPTIVESTUDYurl: null // "https://studien.psychologie.uni-freiburg.de/publix/304/start?batchId=379&generalMultiple" // URL the CAM data should be append to
}