/* default values */
var config = {
    CAMproject: "Klimagesetz_Schweiz", // "proj_" + uuid.v4(), // necessary for server (see ERM)
    ConNumNodes: 1, // number of nodes necessary to draw
    hideArrows: true, // if false = possible to draw arrows

    BidirectionalDefault: true, // if true the default connection is bidirectional

    hideAmbivalent: false, // if false = possible to draw ambivalent node
    showOnlyPosSlid: false, // show only slider for agreement (+1 - +3)
    MaxLengthWords: 3, // maximum number of words for each concept
    MaxLengthChars: 40, // maximum number of characters for each concept
    LengthSentence: 20, // include breaklines if >= X characters
    LengthWords: 8, // include breaklines after each word with cumsum >= X characters
    ShowResearcherButtons: false, // if true = show researcher functionalities
    cameraFeature: false, // include camera / splotlight feature to move screen

    setLanguage: "English", // set language of your CAM study

    fullScreen: false, // if true = study in fullscreen mode + paradata
    showNotPopupStart: true, // only working if fullScreen is set to true

    AdaptiveStudy: true, // run as adaptive study 
    ADAPTIVESTUDYurl: "https://baselpsychology.eu.qualtrics.com/jfe/form/SV_5BCiPNlYEphOQWa", // "https://studien.psychologie.uni-freiburg.de/publix/304/start?batchId=379&generalMultiple" // URL the CAM data should be append to

    setReminder: false, // if true = after X ms 2 reminder pop up


}

// global variable
var usingMangoDB = false;
var usingJATOS = false;


console.log("config config file:", config)