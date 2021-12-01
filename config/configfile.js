/* default values */
var config = {
    CAMproject: "proj_" + uuid.v4(), // necessary for server (see ERM)
    ConNumNodes: 10, // number of nodes necessary to draw
    HideConDirInf: false, // if false = possible to draw arrows
    MaxLengthWords: 3, // maximum number of words for each concept
    MaxLengthChars: 30, // maximum number of characters for each concept
    LengthSentence: 20, // include breaklines
    LengthWords: 10,
    ShowResearcherButtons: false, // show researcher functionalities
    cameraFeature: false, // include camera / splotlight feature to move screen
    AdaptiveStudy: false // run as adaptive study -> change URL

}

// adaptive study
const ADAPTIVESTUDYurl = "https://studien.psychologie.uni-freiburg.de/publix/304/start?batchId=379&generalMultiple"; // if the CAM data should be appended to an URL