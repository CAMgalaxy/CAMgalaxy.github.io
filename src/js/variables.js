/* default values */
// project name !!! add to CAM
var projectnam = "proj_" + uuid.v4();

// necessary conditions to save CAM
var ConNumNodes = 5; // # of nodes
var ConConnected = true;


// stop / breaklines in text:
// > maximum number of characters:
var MaxLengthWords = 50; // allow not more than X characters

var LengthSentence = 20; // if >= X characters
var LengthWords = 15; // after each word with cumsum >= X characters

// hide connector: direction of influence
var HideConDirInf;

// show researcher buttons
var ShowResearcherButtons;

$(function () {
    $('#hideResearcherButtonsNode').show(); // hide
    $('#hideResearcherButtonsConnector').show();
    $('#hideResearcherButtonsTop').show();
});



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
    if (urlSearchParams.has('ConConnected')) {
        ConConnected = parseInt(urlSearchParams.get('ConConnected'), 10);
    }

    // stop / breaklines in text:
    if (urlSearchParams.has('MaxLengthWords')) {
        MaxLengthWords = parseInt(urlSearchParams.get('MaxLengthWords'), 10);
    }

    // hide connector: direction of influence
    if (urlSearchParams.has('HideConDirInf') && urlSearchParams.get('HideConDirInf') === "true") {
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
        }


}
/* end url parameters */








var CAM = new Elements();
const svgns = "http://www.w3.org/2000/svg";

var zoomScale = 0.55;


let arrow = document.createElementNS(svgns, "defs");

let arrowRight = document.createElementNS(svgns, "marker");
arrowRight.setAttribute("id", "arrowRight");
arrowRight.setAttribute("markerWidth", "30");
arrowRight.setAttribute("markerHeight", "15");
arrowRight.setAttribute("refX", "30");
arrowRight.setAttribute("refY", "7.5");
arrowRight.setAttribute("orient", "auto");
arrowRight.setAttribute("markerUnits", "userSpaceOnUse");

let polyR = document.createElementNS(svgns, "polygon");
polyR.setAttribute("points", "30 0, 30 15, 0 7.5");

arrowRight.appendChild(polyR);
arrow.appendChild(arrowRight);

let arrowLeft = document.createElementNS(svgns, "marker");
arrowLeft.setAttribute("id", "arrowLeft");
arrowLeft.setAttribute("markerWidth", "30");
arrowLeft.setAttribute("markerHeight", "15");
arrowLeft.setAttribute("refX", "0");
arrowLeft.setAttribute("refY", "7.5");
arrowLeft.setAttribute("orient", "auto");
arrowLeft.setAttribute("markerUnits", "userSpaceOnUse");

let polyL = document.createElementNS(svgns, "polygon");
polyL.setAttribute("points", "0 0, 30 7.5, 0 15");
arrowLeft.appendChild(polyL);
arrow.appendChild(arrowLeft);

/* variables front end */
const IncreaseSliderIntensity = 4;
// colors for highlighting selected elements
const HighlightSelected = "#33FFFF";
const HighlightAdjacent = "rgb(163, 163, 163)";



// adaptive study
const ADAPTIVESTUDYlog = false; // if the CAM data should be appended to an URL
const ADAPTIVESTUDYurl = "    https://studien.psychologie.uni-freiburg.de/publix/304/start?batchId=379&generalMultiple"; // if the CAM data should be appended to an URL




/* see 
http://www.webtoolkit.info/javascript-base64.html
https://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
*/

var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = Base64._utf8_decode(output);

        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}