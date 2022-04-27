$(function () {

    $("#dialogReference").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: false,
        resizable: false,
        draggable: true,
        width: 400,
        maxWidth: 400,
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        },
        open: function (event, ui) {
            $(".ui-dialog-titlebar").show(); // hide titlebar            
            console.log('dialog got open');
        },
        close: function (event, ui) {
            console.log('dialog got closed');
            closeTab();
        },
        position: {
            my: "right-1% top+5%", // add percentage offsets
            at: "right-1% top+5%",
            of: $(".boxCAMSVG")
        }
    });

    // next add the onclick handler
    $("#quickref").on("click", () => {
        $("#dialogReference").dialog("open");
        return false;
    });


    $("#dialogInteractionEdge").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: false,
        resizable: false,
        draggable: true,
        width: 310,
        maxWidth: 310,
        height: 'auto',
        open: function (event, ui) {
            $(".ui-dialog-titlebar").hide(); // hide titlebar
            $(this).dialog({
                draggable: false
            }).parent().draggable(); // see: https://stackoverflow.com/questions/6410720/jquery-ui-dialog-draggable-on-entire-dialog-not-just-title

            CAM.currentConnector.isSelected = true;

            console.log('dialog connector got open');
            $('.ui-widget-overlay').on('click', function () { // .bind
                $("#dialogInteractionEdge").dialog('close');
            });

            CAM.currentConnector.enterLog({
                type: "selected",
                value: true
            });
        },
        close: function (event, ui) {
            console.log('dialog got closed');

            // if connector got deleted
            if (CAM.currentConnector !== null) {
                CAM.currentConnector.isSelected = false;
                CAM.draw();

                if (CAM.currentConnector.agreement) {
                    CAM.currentConnector.enterLog({
                        type: "change intensity of connector",
                        value: CAM.currentConnector.intensity
                    });
                } else {
                    CAM.currentConnector.enterLog({
                        type: "change intensity of connector",
                        value: CAM.currentConnector.intensity * -1
                    });
                }

                CAM.currentConnector.enterLog({
                    type: "selected",
                    value: false
                });
            }

        },
        position: {
            my: "right-0.5% top+3.5%", // add percentage offsets
            at: "right-0.5% top+3.5%",
            of: $(".boxCAMSVG")
        }
    });


    $("#dialogInteractionNode").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: false,
        resizable: false,
        draggable: true,
        width: 310,
        maxWidth: 310,
        open: function (event, ui) {
            $(".ui-dialog-titlebar").hide(); // hide titlebar
            $(this).dialog({
                draggable: false
            }).parent().draggable();

            CAM.currentNode.isSelected = true;

            CAM.currentNode.enterLog({
                type: "selected",
                value: true
            });

            console.log('dialog got open');

            //setTimeout("$('#dialogInteractionNode').dialog('close')",5000);

            $('.ui-widget-overlay').on('click', function () {
                $("#dialogInteractionNode").dialog('close');
            });

        },
        close: function (event, ui) {
            console.log('dialog got closed');

            /*        */
            // if node got deleted
            if (CAM.currentNode !== null) {
                CAM.currentNode.isSelected = false;
                CAM.draw();

                // adjust event Log
                CAM.currentNode.enterLog({
                    type: "text",
                    value: CAM.currentNode.getText()
                });

                CAM.currentNode.enterLog({
                    type: "value",
                    value: CAM.currentNode.getValue()
                });

                CAM.currentNode.enterLog({
                    type: "comment",
                    value: CAM.currentNode.getComment()
                });

                CAM.currentNode.enterLog({
                    type: "selected",
                    value: false
                });
            }


        },
        position: {
            my: "right-0.5% top+3.5%", // add percentage offsets
            at: "right-0.5% top+3.5%",
            of: $(".boxCAMSVG")
        }
    });
});





/* interactive components: INFORMATION */
// > open single div using navigation bar
function openTab(evt, QRname) {
    $('#informationDefault').hide();

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(QRname).style.display = "block";
    evt.currentTarget.className += " active";
}

// > closing active div clicking on cross topright
function closeTab() {
    $('#informationDefault').show();

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}