import{s as n,j as e,t as d}from"./index-gRz1nVmc.js";import{I as a}from"./constants-pT0QuXi6.js";import{COLOUR as o}from"./colours-CDAOdoal.js";function C(){const s=`
<div class="properties" id="interactionEdge">
            <div style="padding-bottom: 30px;">
                <button id="deleteEdge" class="material-icons deleteButton" style="color:red;" title="Delete Connector">
                    delete </button>
            </div>
            

            <!-- > adjust type and strength of connector -->
            <div class="properties-align" style="margin-bottom:20px" id="hideSliderDisAgree">
                <div class="properties-size-naming">
                ${n.language.cd_01}
                </div>

                <div class="spacing-connector">
                    <span class="redColorTick">${n.language.cd_02}</span>
                    <span class="greenColorTick">${n.language.cd_03}</span>
                </div>
                <div class="outerConnectorSlider">
                    <div class="greenConnectorColorSlider">
                        <div class="redColorConnectorSlider">
                            <input type="range" min="1" max="6" step="1" value="4" id="edgeSlider" autofocus>
                        </div>
                    </div>
                    <div class="labelsConnectorSlider">
                        <span>-3</span>
                        <span>-2</span>
                        <span>-1</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                </div>
            </div>


            <div class="properties-align" id="hideSliderAgreementOnly">
                <div class="properties-size-naming">
                ${n.language.cd_01a}
                </div>
                <div class="outerConnectorSlider">
                    <div class="greenConnectorColorSliderAgreementOnly">
                        <input type="range" min="4" max="6" step="1" value="4" id="edgeSliderAgreementOnly" autofocus>
                    </div>
                </div>
                <div class="labelsConnectorSliderAgreementOnly">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
            </div>




            <!-- > adjust of connectivity of edge -->
            <div id="hideConnectorDirInfluence">
                <div class="properties-size-naming" style="margin-top: 25px;">
                ${n.language.cd_04}
                </div>

                <div style="text-align: center;">
                    <div>
                        <button id="bidirectional" type="button" class="material-icons"
                            title="Concepts influence each other"
                            style="font-size: 50px;">sync_alt</button>
                        <button id="monodirectional" type="button" class="material-icons"
                            title="Concepts influence each other in a one-sided direction. Press button multiple times to change direction"
                            class="connectorButton" style="font-size: 50px;">trending_flat</button>
                    </div>
                </div>
            </div>
            <!-- for researcher only -->
            <div id="hideResearcherButtonsConnector">
                <div style="margin-top: 20px; font-size:16px; font-style: italic;">
                    The following functions are only available to researchers:
                </div>
                <div>
                    <button id="ResErasabilityConnector" type="button" class="typeResearcherButton">
                        deletable
                    </button>
                </div>
            </div>

        </div>`;var u=document.getElementById("dialogInteractionEdge");u.innerHTML+=s,e(function(){document.getElementById("deleteEdge").title=n.language.cd_07buttonDelete,document.getElementById("bidirectional").title=n.language.cd_05button,document.getElementById("monodirectional").title=n.language.cd_06button}),e(function(){n.config.ShowResearcherButtons?(e("#hideResearcherButtonsNode").show(),e("#hideResearcherButtonsConnector").show(),e("#hideResearcherButtonsTop").show()):(e("#hideResearcherButtonsNode").hide(),e("#hideResearcherButtonsConnector").hide(),e("#hideResearcherButtonsTop").hide()),n.config.OnlyStraightCon?(e("#hideSliderDisAgree").hide(),e("#hideSliderAgreementOnly").show()):(e("#hideSliderDisAgree").show(),e("#hideSliderAgreementOnly").hide()),e("#edgeSlider").on("input",function(){var t=document.querySelector("#edgeSlider"),i=0,c=document.querySelector(".greenConnectorColorSlider"),l=document.querySelector(".greenColorTick"),g=document.querySelector(".redColorConnectorSlider"),m=document.querySelector(".redColorTick");const r=[o.white,o.red1,o.red2,o.red3,o.green3,o.green2,o.green1];var v=!(t.value<=3);n.cam.currentConnector.setAgreement(v),g.style.backgroundColor=t.value<=3?r[t.value]:r[0],m.style.backgroundColor=t.value<=3?r[t.value]:r[0],c.style.backgroundColor=t.value>3?r[t.value]:r[0],l.style.backgroundColor=t.value>3?r[t.value]:r[0],i=t.value<=3?(4-t.value)*a:(t.value-3)*a,n.cam.currentConnector.intensity=i,n.cam.currentConnector.value=t.value,n.cam.draw()}),e("#edgeSliderAgreementOnly").on("input",function(){var t=document.querySelector("#edgeSliderAgreementOnly"),i=0,c=document.querySelector(".greenConnectorColorSliderAgreementOnly");const l=[o.white,o.red1,o.red2,o.red3,o.green3,o.green2,o.green1];c.style.backgroundColor=t.value>3?l[t.value]:l[0],i=t.value<=3?(4-t.value)*a:(t.value-3)*a,n.cam.currentConnector.intensity=i,n.cam.currentConnector.value=t.value,n.cam.draw()}),e("#bidirectional").on("click",()=>{n.cam.currentConnector!=null&&(n.cam.updateElement("Connector","bidirection",!0),n.cam.draw())}),e("#monodirectional").on("click",()=>{n.cam.currentConnector!=null&&(n.cam.updateElement("Connector","direction",null),n.cam.draw())}),e("#deleteEdge").on("click",()=>{n.cam.currentConnector.enterLog({type:"connector was deleted",value:-99}),n.cam.deleteElement(),e("#dialogInteractionEdge").dialog("close")}),e("#ResErasabilityConnector").on("click",()=>{n.cam.currentConnector!=null&&(n.cam.currentConnector.isDeletable==!0?(n.cam.currentConnector.setIsDeletable(!1),d.info("The connector is now not deletable.")):n.cam.currentConnector.isDeletable==!1&&(n.cam.currentConnector.setIsDeletable(!0),d.info("The connector is now deletable.")))})}),n.config.enableArrows?(e("#hideConnectorDirInfluence").hide(),e(function(){e("#hideConnectorDirInfluence").hide()})):(e("#hideConnectorDirInfluence").show(),e(function(){e("#hideConnectorDirInfluence").show()})),n.config.OnlyStraightCon?e(function(){e("#hideSliderDisAgreeRef").hide(),e("#hideSliderDisAgreeRef2").hide(),e("#showSliderAgreeOnlyRef").show()}):e(function(){e("#hideSliderDisAgreeRef").show(),e("#hideSliderDisAgreeRef2").show(),e("#showSliderAgreeOnlyRef").hide()})}export{C as initInteractionEdgeDialog};
