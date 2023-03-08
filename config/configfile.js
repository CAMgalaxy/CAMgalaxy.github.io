/* default values */
var config = {
    CAMproject: "SAI_CAMS", // "proj_" + uuid.v4(), // necessary for server (see ERM)
    ConNumNodes: 8, // number of nodes necessary to draw
    hideArrows: false, // if false = possible to draw arrows

    BidirectionalDefault: true, // if true the default connection is bidirectional

    hideAmbivalent: false, // if false = possible to draw ambivalent node
    showOnlyPosSlid: false, // show only slider for agreement (+1 - +3)
    MaxLengthWords: 3, // maximum number of words for each concept
    MaxLengthChars: 40, // maximum number of characters for each concept
    LengthSentence: 16, // include breaklines if >= X characters
    LengthWords: 8, // include breaklines after each word with cumsum >= X characters
    ShowResearcherButtons: false, // if true = show researcher functionalities
    cameraFeature: false, // include camera / splotlight feature to move screen
    fullScreen: false, // if true = study in fullscreen mode + paradata

    setLanguage: "English", // set language of your CAM study


    showNotPopupStart: true, // only working if fullScreen is set to true

    AdaptiveStudy: true, // run as adaptive study 
    ADAPTIVESTUDYurl: "https://www.unipark.de/uc/fr_uni_inst_psych_allg/28b6/", // "https://studien.psychologie.uni-freiburg.de/publix/304/start?batchId=379&generalMultiple" // URL the CAM data should be append to
}

// global variable
var usingMangoDB = false;
var usingJATOS = false;


console.log("config config file:", config)