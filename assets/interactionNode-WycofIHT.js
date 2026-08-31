import{s as e,j as t,t as o}from"./index-gRz1nVmc.js";import{COLOUR as l}from"./colours-CDAOdoal.js";function m(){const r=`
<div class="properties" id="interactionNode">
<!-- delete node: -->
<div style="padding-bottom: 30px;">
    <button id="deleteNode" class="material-icons deleteButton" style="color:red;" title="Delete Concept">
        delete </button>
</div>

<!-- > adjust text -->
<div class="properties-align">
    <div class="properties-size-naming">
    ${e.language.nd_01}
    </div>
    <input id="inptextnode" type="text"
        style="width: 99%; text-align: left;   margin: auto; display: block;" autofocus>
</div>


<!-- > adjust type and strength of concept -->
<div class="properties-align">
    <div class="properties-size-naming">
    ${e.language.nd_02}
    </div>
</div>

<div class="outerNodeSlider" style="margin-bottom: 25px;">
    <div class="greenColorNodeSlider">
        <div class="yellowColorNodeSlider">
            <div class="redColorNodeSlider">
                <input type="range" min="1" max="7" step="1" id="nodeSlider" list="steplist">
            </div>
        </div>
    </div>
    <div class="labelsNodeSlider">
        <span>-3</span>
        <span>-2</span>
        <span>-1</span>
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
</div>


<div id="hideAmvivalentNode" class="spacing-node">

    <input type="checkbox" id="checkboxAmbivalent" style="font-size: 20px;">
    <label for="checkboxAmbivalent" style="font-size: 16px; margin-left: 5px;">${e.language.nd_03} </label>

    <image type="image"
        src="./img/ambivalent_node.svg#svgView(viewBox(5,5,250,120))"
        style="width: 85px; height: 65px; margin-left: 5px; margin-top: 5px;"></image>

</div>




<!-- > adjust comment -->
<div class="properties-align">
    <div class="properties-size-naming">
    ${e.language.nd_04}
    </div>
    <textarea id="inpcommentnode" rows="4",
        style="width: 97%; text-align: left; margin: auto; display: block;"></textarea>
</div>

<!-- for researcher only -->
<div id="hideResearcherButtonsNode">
    <div style="margin-top: 20px; font-size:16px; font-style: italic;">
        The following functions are only available to researchers:
    </div>
    <div>
        <button id="ResErasabilityNode" type="button" class="typeResearcherButton">
            deletable
        </button>

        <button id="ResManoeuvrability" type="button" class="typeResearcherButton">
            movable
        </button>

        <button id="TextChangeableNode" type="button" class="typeResearcherButton">
         changeable
    </button>
    </div>
</div>
</div>`;var s=document.getElementById("dialogInteractionNode");s.innerHTML+=r,t(function(){document.getElementById("deleteNode").title=e.language.nd_05buttonDelete}),t(function(){t("#inptextnode").on("input",function(){var n=e.config.MaxNumWords,a=e.config.MaxLengthChars;if(e.cam.currentNode.isTextChangeable){var i=this.value.split(" ").filter(d=>d!="");i=i.length,i<=n&&this.value.length<=a?(e.cam.updateElement("Node","text",this.value),e.cam.draw()):i>n?o.warning(e.language.ndw_01tooManyWords,e.language.ndw_02tooManyWords+n+e.language.ndw_03tooManyWords,{closeButton:!0,timeOut:2e3,positionClass:"toast-top-center",preventDuplicates:!0}):this.value.length>a&&o.warning(e.language.ndw_01tooManyWords,e.language.ndw_02tooManyWords+a+e.language.ndw_03tooManyWordsA,{closeButton:!0,timeOut:2e3,positionClass:"toast-top-center",preventDuplicates:!0})}else o.info(e.language.ndw_01predefinedConcept,e.language.ndw_02predefinedConcept,{closeButton:!0,timeOut:2e3,positionClass:"toast-top-center",preventDuplicates:!0})}),t("#nodeSlider").on("input",function(){var n=document.querySelector("#nodeSlider"),a=document.querySelector(".greenColorNodeSlider"),i=document.querySelector(".redColorNodeSlider");switch(!0){case n.value==4:i.style.backgroundColor=l.red3,a.style.backgroundColor=l.green3,e.cam.updateElement("Node","value",0);break;case n.value<=3:const d=["white",l.red1,l.red2,l.red3];i.style.backgroundColor=d[n.value],e.cam.updateElement("Node","value",n.value-4);break;case n.value>=5:const c=["white",l.green3,l.green2,l.green1];a.style.backgroundColor=c[n.value-4],e.cam.updateElement("Node","value",n.value-4);break}e.cam.draw()}),t("#checkboxAmbivalent").on("click",function(n){var a=document.querySelector("#checkboxAmbivalent").checked;a===!0&&(o.info(e.language.ndw_01ambivalentConcept),e.ui.counterChangeAmbiConcept++,e.ui.counterChangeAmbiConcept==2&&t(this).off(n))}),t("#checkboxAmbivalent").on("input",function(){var n=document.querySelector("#checkboxAmbivalent").checked;document.getElementById("nodeSlider").value=4,n===!0?(document.getElementById("nodeSlider").disabled=!0,e.cam.updateElement("Node","value",10)):(document.getElementById("nodeSlider").disabled=!1,e.cam.updateElement("Node","value",0)),e.cam.draw()}),t("#inpcommentnode").on("input",function(){e.cam.updateElement("Node","comment",this.value),e.cam.draw()}),t("#deleteNode").on("click",()=>{console.log("Deleted using botton"),e.cam.currentNode.enterLog({type:"node was deleted",value:-99}),e.cam.deleteElement(),t("#dialogInteractionNode").dialog("close")}),t(document).keyup(function(n){n.keyCode==46&&(e.cam.currentNode!=null?(console.log("Deleted using keypress"),e.cam.currentNode.enterLog({type:"node was deleted",value:-77}),e.cam.deleteElement(),t("#dialogInteractionNode").dialog("close")):e.cam.currentConnector!=null&&(console.log("Deleted using keypress"),e.cam.currentConnector.enterLog({type:"connector was deleted",value:-77}),e.cam.deleteElement(),t("#dialogInteractionEdge").dialog("close")))}),t("#ResErasabilityNode").on("click",()=>{e.cam.currentNode!=null&&(e.cam.currentNode.isDeletable==!0?(e.cam.currentNode.setIsDeletable(!1),o.info("The node is now not deletable.")):e.cam.currentNode.isDeletable==!1&&(e.cam.currentNode.setIsDeletable(!0),o.info("The node is now deletable.")))}),t("#ResManoeuvrability").on("click",()=>{e.cam.currentNode!=null&&(e.cam.currentNode.isDraggable==!0?(e.cam.currentNode.setIsDraggable(!1),o.info("The node is now not draggable.")):e.cam.currentNode.isDraggable==!1&&(e.cam.currentNode.setIsDraggable(!0),o.info("The node is now draggable.")))}),t("#TextChangeableNode").on("click",()=>{e.cam.currentNode!=null&&(e.cam.currentNode.isTextChangeable==!0?(e.cam.currentNode.setIsTextChangeable(!1),o.info("The text of the node is now not changeable.")):e.cam.currentNode.isTextChangeable==!1&&(e.cam.currentNode.setIsTextChangeable(!0),o.info("The text of the node is now changeable.")))})}),e.config.enableAmbivalent?(t("#hideAmvivalentNode").hide(),t(function(){t("#hideAmvivalentNode").hide()})):(t("#hideAmvivalentNode").show(),t(function(){t("#hideAmvivalentNode").show()}))}export{m as initInteractionNodeDialog};
