/* add button: */
const saveButton = `<button id="saveCAM" onclick="saveCam()" class="material-icons" title="Save CAM on server" style="margin-right: 5px;">save</button>`;
var target = document.getElementById("rightButton");
target.innerHTML += saveButton;


function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";

    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return uri + separator + key + "=" + value;
    }
}



function saveCam() {
    var CAMnodes = CAM.nodes.filter(element => element.isActive === true);
    var CAMconnectors = CAM.connectors.filter(element => element.isActive === true);

    // every concept should include text
    var CAMnodesNoText = CAMnodes.filter(element => element.text.length === 0);
    console.log(CAMnodesNoText)
    if (CAMnodesNoText.length > 0) {
        toastr.warning("Please return to your Cognitive-Affective Map and add text to the empty concepts.", CAMnodesNoText.length + " concept(s) are empty.", {
            closeButton: true,
            timeOut: 2000,
            positionClass: "toast-top-center",
            preventDuplicates: true
        })
        return false;
    }
    // necessary # of concepts
    if (CAMnodes.length < config.ConNumNodes) {
        toastr.warning("Please return to your Cognitive-Affective Map and add additional concepts to it.", "Please draw at least " + config.ConNumNodes + " concepts.", {
            closeButton: true,
            timeOut: 2000,
            positionClass: "toast-top-center",
            preventDuplicates: true
        })
        return false;
    } else if ((CAMnodes.length - 1) > CAMconnectors.length) { // CAMnodes.every(element => element.isConnected !== true)
        /* 
        test:
        necessary condition -> everything is connected using simple checks (still possible that there are X non-connected components) 
        */
        console.log("CAMconnectors.length: ", CAMconnectors.length);
        console.log("CAM.nodes.length: ", CAMnodes.length);

        // console.log(CAMnodes.every(element => element.isConnected !== true));
        toastr.warning("Please return to your Cognitive-Affective Map and add additional connections to it.", "Please connect all your concepts within your Cognitive-Affective Map.", {
            closeButton: true,
            timeOut: 2000,
            positionClass: "toast-top-center",
            preventDuplicates: true
        })

        return false;
    } else {
        addElementsCy();
        var ResbfsAl = bfsAlgorithm("#" + cy.nodes()[0].id());
        console.log("num of distinct components of CAM: ", ResbfsAl);

        if (ResbfsAl !== 1) {
            toastr.warning("Please return to your Cognitive-Affective Map and add additional connections to it.", "Please connect all your " + ResbfsAl + " distinct groups of concepts within your Cognitive-Affective Map.", {
                closeButton: true,
                timeOut: 2000,
                positionClass: "toast-top-center",
                preventDuplicates: true
            })

            return false;
        } else {
            toastr.success("Your CAM data has been sent to the sever. Thank you for participating! You will be forwarded to the final part of the study.", {
                closeButton: true,
                timeOut: 3000,
                positionClass: "toast-top-center",
                preventDuplicates: true
            })

            // after 3 seconds 
            var delay = (function () {
                var timer = 0;
                return function (callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                };
            })();

            delay(function () {
                /* if server is >>> JATOS <<< */
                if (typeof jatos.jQuery === "function") {
                    // set defocus data
                    if (config.fullScreen == true) {
                        CAM.defocusCAM = arraydefocusevent;
                    }
                    // If JATOS is available, send data there
                    var resultJson = CAM;
                    console.log("my result data sent to JATOS final time: ", resultJson);
                    jatos.submitResultData(resultJson)
                        .then(() => console.log('success'))
                        .catch(() => console.log('error'));

                    // then redirect
                    if (config.AdaptiveStudy) {
                        // > with adaptive design


                    } else {
                        // > without adaptive design


                        /*
                        var newUrl = updateQueryStringParameter("https://studien.psychologie.uni-freiburg.de/publix/324/start?batchId=403&generalMultiple", 
                        "IDparticipant", "part3_" + CAM.participantCAM);
                        newUrl = updateQueryStringParameter(newUrl, "SONA_ID", studyData.SONA_ID);
                        // var newUrl = "http://127.0.0.1:9000/publix/804/start?batchId=804&generalMultiple"
                        // jatos.endStudyAndRedirect(newUrl, true, "everything worked fine");
                                       */
                        jatos.endStudy(true, "everything worked fine");
                    }
                }


                /* if server is >>> Mango DB <<< */

                    async function pushData() {

                        // if no MangoDB return and print toastr
                        const dataRaw2 = await fetch(URL);
                        if(dataRaw2.status != 200){
                            toastr.success("You would have send the CAM data successfully to a sever. To save permanently your data please use our administrative panel or host the C.A.M.E.L. software on your own server.", {
                                closeButton: true,
                                timeOut: 4000,
                                positionClass: "toast-top-center",
                                preventDuplicates: true
                            })
                            console.log(dataRaw2.status)

                            return;
                        }

                        let info = {
                            method: 'POST',
                            body: JSON.stringify({
                                jwt: token,
                                cam: CAM,
                            }),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            }
                        }

                        const res = await fetch('https://camel-main.herokuapp.com/participants/addExperience', info);

                        if (res.status == 201) {
                            window.location = linkRedirect + "&jwt=" + token;
                        }
                    }
                    pushData();
              

                /* if server is  >>> XYZ <<< */
                

            }, 3000); // end delay


        }
    }
}