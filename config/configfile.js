/* default values */
var config = {
    CAMproject: "proj_" + uuid.v4(), // necessary for server (see ERM)
    ConNumNodes: 20, // number of nodes necessary to draw
    hideArrows: false, // if false = possible to draw arrows
    hideAmbivalent: false, // if false = possible to draw ambivalent node
    showOnlyPosSlid: false, // show only slider for agreement (+1 - +3)
    MaxLengthWords: 5, // maximum number of words for each concept
    MaxLengthChars: 50, // maximum number of characters for each concept
    LengthSentence: 16, // include breaklines if >= X characters
    LengthWords: 12, // include breaklines after each word with cumsum >= X characters
    ShowResearcherButtons: false, // if true = show researcher functionalities
    cameraFeature: false, // include camera / splotlight feature to move screen
    fullScreen: true, // if true = study in fullscreen mode + paradata

    setLanguage: "English", // set language of your CAM study

    AdaptiveStudy: true, // run as adaptive study 
    ADAPTIVESTUDYurl: "https://weblab.psychologie.uni-freiburg.de/publix/GGb5UBLkCsW", // "https://studien.psychologie.uni-freiburg.de/publix/304/start?batchId=379&generalMultiple" // URL the CAM data should be append to
}

// global variable
var usingMangoDB = false;
var usingJATOS = true;


console.log("config config file:", config)