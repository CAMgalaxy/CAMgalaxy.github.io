/* add button: */
const saveButton = `<button id="saveCAM" onclick="saveCam()" class="material-icons" title="Save CAM on server" style="margin-right: 5px;">save</button>`;
var target = document.getElementById("rightButton");
target.innerHTML += saveButton;

// language file
$(function () {
    document.getElementById("saveCAM").title = languageFileOut.btr_02; // buttons top right (btr)

    document.getElementById("dialogConfirmSave").title = languageFileOut.confirmSaving_01_title; // title confirm saving

});


function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf("?") !== -1 ? "&" : "?";

    if (uri.match(re)) {
        return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
        return uri + separator + key + "=" + value;
    }
}

function saveCam() {
    var CAMnodes = CAM.nodes.filter((element) => element.isActive === true);
    var CAMconnectors = CAM.connectors.filter(
        (element) => element.isActive === true
    );

    // every concept should include text
    var CAMnodesNoText = CAMnodes.filter(
        (element) => element.text.length === 0
    );
    console.log(CAMnodesNoText);
    if (CAMnodesNoText.length > 0) {
        toastr.warning(
            languageFileOut.popSave_01emptyNodes,
            CAMnodesNoText.length + languageFileOut.popSave_02emptyNodes,
            {
                closeButton: true,
                timeOut: 2000,
                positionClass: "toast-top-center",
                preventDuplicates: true,
            }
        );
        return false;
    }
    // necessary # of concepts
    if (CAMnodes.length < config.MinNumNodes) {
        toastr.warning(
            languageFileOut.popSave_01numNodes,
            languageFileOut.popSave_02numNodes +
            config.MinNumNodes +
            languageFileOut.popSave_03numNodes,
            {
                closeButton: true,
                timeOut: 2000,
                positionClass: "toast-top-center",
                preventDuplicates: true,
            }
        );
        return false;
    } else if (CAMnodes.length - 1 > CAMconnectors.length) {
        // CAMnodes.every(element => element.isConnected !== true)
        /* 
        test:
        necessary condition -> everything is connected using simple checks (still possible that there are X non-connected components) 
        */
        console.log("CAMconnectors.length: ", CAMconnectors.length);
        console.log("CAM.nodes.length: ", CAMnodes.length);

        // console.log(CAMnodes.every(element => element.isConnected !== true));
        toastr.warning(
            languageFileOut.popSave_01unconnectedA,
            languageFileOut.popSave_02unconnectedA,
            {
                closeButton: true,
                timeOut: 2000,
                positionClass: "toast-top-center",
                preventDuplicates: true,
            }
        );

        return false;
    } else {
        addElementsCy();
        var ResbfsAl = bfsAlgorithm("#" + cy.nodes()[0].id());
        console.log("num of distinct components of CAM: ", ResbfsAl);

        if (ResbfsAl !== 1) {
            toastr.warning(
                languageFileOut.popSave_01unconnectedB,
                languageFileOut.popSave_02unconnectedB +
                " " +
                ResbfsAl +
                languageFileOut.popSave_03unconnectedB,
                {
                    closeButton: true,
                    timeOut: 2000,
                    positionClass: "toast-top-center",
                    preventDuplicates: true,
                }
            );

            return false;
        } else {
            /* check drawn concepts */

            // Initialize arrays to test
            var conceptsToDraw = ["wenig Auswahl", "frische Lebensmittel", "leckere Lebensmittel", "Einkauf Wochenmarkt", "teuer", "im Freien", "schlechtes Wetter", "frische Luft"];
            var conceptsValence = [-1, 2, 2, 0, -3, 10, -1, 1];

            // Create a new array of objects containing cleaned text and raw values
            var cleanedCAMnodes = CAMnodes.map((element) => {
                return {
                    text: element.text.trim().replace(/\s+/g, ' '), // Clean the text
                    value: element.value                           // Keep the value as is
                };
            });

            console.log("cleanedCAMnodes: ", cleanedCAMnodes);

            // Compare valence values
            var includePredefinedTextValence = [];

            cleanedCAMnodes.forEach((concept, index) => {
                var textIndex = conceptsToDraw.indexOf(concept.text);

                // Check if the concept exists in arrayText
                if (textIndex !== -1) {
                    var arrayValenceValue = concept.value;
                    var conceptsValenceValue = conceptsValence[textIndex];

                    // Compare valence values
                    var isEqual = arrayValenceValue === conceptsValenceValue || arrayValenceValue === conceptsValenceValue - 1 || arrayValenceValue === conceptsValenceValue + 1;

                    includePredefinedTextValence.push(isEqual);

                    console.log(`Concept: ${concept.text}`);
                    console.log(`arrayValence: ${arrayValenceValue}`);
                    console.log(`conceptsValence: ${conceptsValenceValue}`);
                    console.log(`Is equal: ${isEqual}`);
                } else {
                    // If the concept does not exist in arrayText, push false
                    includePredefinedTextValence.push(false);

                    console.log(`Concept: ${concept} is not found in arrayText`);
                }
            });

            var allMatch = includePredefinedTextValence.every(value => value === true);

            console.log("includePredefinedTextValence: ", includePredefinedTextValence);
            console.log("allMatch: ", allMatch);


            if (!allMatch) {
                toastr.warning(
                    "Bitte überprüfen Sie die Schreibweise ihrer gezeichneten Konzepte und die vergebene emotionale Bewertung.",
                    {
                        closeButton: true,
                        timeOut: 4000,
                        positionClass: "toast-top-center",
                        preventDuplicates: true,
                    }
                );

                return false;
            }


            /* check drawn connectors */

            // Create a new array of objects containing raw values and raw agreement
            var cleanedCAMconnectors = CAMconnectors.map((element) => {
                return {
                    agreement: element.agreement,  // Keep agreement as is
                    value: element.agreement ? element.intensity / 3 : element.intensity / 3 * -1                       // Keep the value as is
                };
            });


            console.log("cleanedCAMconnectors: ", cleanedCAMconnectors);



            if (cleanedCAMconnectors.length != 8) { // 8
                toastr.warning(
                    "Bitte überprüfen Sie die Anzahl der gezeichneten Verbindungen zwischen den Konzepten, diese sollten acht sein.",
                    {
                        closeButton: true,
                        timeOut: 4000,
                        positionClass: "toast-top-center",
                        preventDuplicates: true,
                    }
                );

                return false;
            }


            // Count the occurrences of each agreement
            var agreementCount = {};
            var valueCount = {};

            // Iterate through the cleanedCAMconnectors to count agreements and values
            cleanedCAMconnectors.forEach(connector => {
                // Count agreements
                if (agreementCount[connector.agreement]) {
                    agreementCount[connector.agreement]++;
                } else {
                    agreementCount[connector.agreement] = 1;
                }

                // Count values
                if (valueCount[connector.value]) {
                    valueCount[connector.value]++;
                } else {
                    valueCount[connector.value] = 1;
                }
            });


            console.log("cleanedCAMconnectors: ", cleanedCAMconnectors);
            console.log("Agreement counts: ", agreementCount);
            console.log("Agreement counts true: ", agreementCount.true);
            console.log("Agreement counts false: ", agreementCount.false);

            console.log("Value counts: ", valueCount);



            
            if (agreementCount.true != 6 && agreementCount.false != 2) { // 6, 2
                toastr.warning(
                    "Bitte überprüfen Sie den Typ der gezeichneten Verbindungen zwischen den Konzepten. Achten Sie hierbei auf die Anzahl der positiven und negativen Verbindungen.",
                    {
                        closeButton: true,
                        timeOut: 4000,
                        positionClass: "toast-top-center",
                        preventDuplicates: true,
                    }
                );

                return false;
            }

            // confirm saving
            $("#dialogConfirmSave").dialog("open");
        }
    }
}

function saveCAMsuccess() {
    toastr.success(languageFileOut.popSave_01savedData, {
        closeButton: true,
        timeOut: 4000,
        positionClass: "toast-top-center",
        preventDuplicates: true,
    });

    // after 4 seconds
    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    delay(function () {
        // set defocus data
        if (config.fullScreen == true) {
            CAM.defocusCAM = arraydefocusevent;
        }

        /* if server is >>> JATOS <<< */
        console.log("usingJATOS: ", usingJATOS);
        if (usingJATOS) {
            if (typeof jatos.jQuery === "function") {
                // if an ID was sent via URL param overwrite CAM creator
                if (
                    Object.keys(jatos.urlQueryParameters).indexOf(
                        "participantID"
                    ) >= 0
                ) {
                    CAM.creator = jatos.urlQueryParameters.participantID;
                } else {
                    CAM.creator = "noID";
                }

                // If JATOS is available, send data there
                var resultJson = CAM;
                console.log(
                    "my result data sent to JATOS first and final time"
                );
                jatos
                    .submitResultData(resultJson)
                    .then(() => console.log("success"))
                    .catch(() => console.log("error"));

                // > with adaptive design
                if (config.AdaptiveStudy) {
                    var newUrl = updateQueryStringParameter(
                        config.ADAPTIVESTUDYurl,
                        "participantID",
                        CAM.creator
                    );
                    jatos.endStudyAndRedirect(
                        newUrl,
                        true,
                        "everything worked fine"
                    );
                } else {
                    jatos.endStudy(true, "everything worked fine");
                }
            }
        }

        /* if server is >>> MangoDB <<< */
        console.log("usingSupabase: ", usingSupabase);
        if (usingSupabase) {
            async function pushData() {
                let info = {
                    method: "POST",
                    body: JSON.stringify({
                        jwt: token,
                        cam: CAM,
                    }),
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': "application/json",
                    },
                };

                // console.log("info", info)

                const res = await fetch(
                    webAddress + "participants/submitExperiment",
                    info
                );



                if (res.status == 201) {
                    window.location =
                        linkRedirect +
                        "?participantID=" +
                        CAM.creator;

                    /*
                    "?jwt=" +
                    token +
                    */
                }
            }
            pushData();
        }

        /* if NO server >>> <<< */
        if (!usingJATOS && !usingSupabase) {
            toastr.success(languageFileOut.popSave_01notSavedData, {
                closeButton: true,
                timeOut: 4000,
                positionClass: "toast-top-center",
                preventDuplicates: true,
            });
        }
    }, 4000); // end delay
}
