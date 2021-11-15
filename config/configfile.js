/* default values */
var config = {
    CAMproject: "proj_" + uuid.v4(), // necessary for server (see ERM)
    ConNumNodes: 10, // number of nodes necessary to draw
    HideConDirInf: false, // if false = possible to draw arrows
    MaxLengthWords: 40, // stop / breaklines content nodes:
    LengthSentence: 20,
    LengthWords: 10,
    ShowResearcherButtons: false, // show researcher functionalities
    AdaptiveStudy: false, // run as adaptive study -> change URL
    cameraFeature: true // include camera / splotlight feature to move screen
}

// adaptive study
const ADAPTIVESTUDYlog = config.AdaptiveStudy; // if the CAM data should be appended to an URL
const ADAPTIVESTUDYurl = "https://studien.psychologie.uni-freiburg.de/publix/304/start?batchId=379&generalMultiple"; // if the CAM data should be appended to an URL
