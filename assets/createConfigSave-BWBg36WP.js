import{j as e,s as n}from"./index-gRz1nVmc.js";function f(){const u=`
<span style="font-size: 12px; vertical-align: super; margin-left: 5px;">to set up your study click:</span>
<button id="createConfigSave" title="set up your config file and cope & paste the resulting code to set up the experiment" class="material-icons" style="margin-left: 0px; margin-right: -5px">settings</button>
`;var g=document.getElementById("hideResearcherButtonsTop");g.innerHTML+=u;const v=`
<div class="properties">
    <!-- > adjust text -->
    <div class="properties-align">
        <div class="properties-size-naming" style="font-size:18px;">
            Define the configuration of your CAM study:
        </div>
        <div class="row" style="background-color:#aaa;">
            <div class="column1">
                Number of nodes necessary to draw (about 10 recommended):
            </div>
            <div class="column2">
            <input type="number" id="setMinNumNodes" min="1" max="50" style="width: 60%; margin-top: 14px;" value="10">
            </div>
        </div>
        <div class="row" style="background-color:#bababa;">
            <div class="column1">
                Maximum number of words for each concept (2-3 recommended):
            </div>
            <div class="column2">
                <input type="number" id="setMaxNumWords" min="1" max="5" style="width: 60%; margin-top: 10px;" value="3">
            </div>
        </div>
        <div class="row" style="background-color:#aaa;">
            <div class="column1">
                Maximum number of characters for each concept (at least 30 recommended):
            </div>
            <div class="column2">
                <input type="number" id="setMaxLengthChars" min="30" max="300" style="width: 60%; margin-top: 10px;" value="30">
            </div>
        </div>

        <div class="row" style="background-color:#bababa;">
            <div class="column1">
                Possibility to draw arrows / directed connections:
            </div>
            <div class="column2">
                <label class="switch" style="margin-top: 8px;">
                <input type="checkbox" id="setenableArrows" checked>
                <div class="slider round">
                </div>
                </label>
            </div>
        </div>

        <div class="row" style="background-color:#aaa;">
            <div class="column1">
                As default the drawn connection is bidirectional:
            </div>
            <div class="column2">
                <label class="switch" style="margin-top: 8px;">
                <input type="checkbox" id="setBidirectionalDefault" checked>
                <div class="slider round">
                </div>
                </label>
            </div>
        </div>

        <div class="row" style="background-color:#bababa;">
            <div class="column1">
                Possibility to draw only supporting connections (no recommendation):
            </div>
            <div class="column2">
                <label class="switch" style="margin-top: 8px;">
                <input type="checkbox" id="setOnlyStraightCon">
                <div class="slider round">
                </div>
                </label>
            </div>
        </div>

        <div class="row" style="background-color:#aaa;">
            <div class="column1">
                Possibility to to draw ambivalent nodes (no recommendation):
            </div>
            <div class="column2">
                <label class="switch" style="margin-top: 8px;">
                <input type="checkbox" id="setenableAmbivalent" checked>
                <div class="slider round">
                </div>
                </label>
            </div>
        </div>
        
        <div class="row" style="background-color:#bababa;">
            <div class="column1">
                Include splotlight feature to move screen (only recommended if large CAMs are expected):
            </div>
            <div class="column2">
                <label class="switch" style="margin-top: 8px;">
                <input type="checkbox" id="setcameraFeature">
                <div class="slider round">
                </div>
                </label>
            </div>
        </div>

        <div class="row" style="background-color:#aaa;">
        <div class="column1">
            Set study to fullscreen mode and collect paradata (recommended):
        </div>
        <div class="column2">
            <label class="switch" style="margin-top: 8px;">
            <input type="checkbox" id="setfullScreen" checked>
            <div class="slider round">
            </div>
            </label>
        </div>
    </div>

    <div class="row" style="background-color:#bababa;">
        <div class="column1">
            Set the language of the Data Collection Tool interface:
        </div>
    <div class="column2">
        <label class="switch" style="margin-top: 8px;">
            <select name="setLanguage" id="setLanguage">
            <option value="English">English</option>
            <option value="German">German</option>
            <option value="Spanish">Spanish</option>
            <option value="Chinese">Chinese</option>
            </select> 
        </label>
    </div>
    </div>
    <br>
    <div class="properties-align" style="font-size: 15px;">
       After you have set the configuration click button and copy & paste the code (JSON file) to the administrative:
    </div>
    <div class="centerCopyPaste">
    <button onclick="copyText()" style="height: 45px; width: 75px;">Copy text</button>
    </div>

    <br>
    <div class="properties-align" style="font-size: 15px; font-style: italic;">
    You have generated the following code (! do not change the text except you really know what you are doing):
<textarea id="createdConfigPlusCAM"
    style="width: 97%; text-align: left; margin: auto; display: block;"></textarea>
</div>
</div>
</div>`;var p=document.getElementById("dialogSetUpStudy");p.innerHTML+=v;function b(){var a=document.getElementById("createdConfigPlusCAM");a.select(),a.setSelectionRange(0,99999),navigator.clipboard.writeText(a.value),alert("Copied the text: "+a.value)}function c(){var a={config:{MinNumNodes:e("#setMinNumNodes").val(),MaxNumWords:e("#setMaxNumWords").val(),MaxLengthChars:e("#setMaxLengthChars").val(),enableArrows:null,BidirectionalDefault:null,OnlyStraightCon:null,enableAmbivalent:null,cameraFeature:null,fullScreen:null,setLanguage:e("#setLanguage").val(),LengthSentence:16,LengthWords:12,ShowResearcherButtons:!1},CAM:{nodes:null,connectors:null}};e("#setenableArrows").is(":checked")?a.config.enableArrows=!1:a.config.enableArrows=!0,e("#setBidirectionalDefault").is(":checked")?a.config.BidirectionalDefault=!0:a.config.BidirectionalDefault=!1,e("#setenableAmbivalent").is(":checked")?a.config.enableAmbivalent=!1:a.config.enableAmbivalent=!0,e("#setOnlyStraightCon").is(":checked")?a.config.OnlyStraightCon=!0:a.config.OnlyStraightCon=!1,e("#setcameraFeature").is(":checked")?a.config.cameraFeature=!0:a.config.cameraFeature=!1,e("#setfullScreen").is(":checked")?a.config.fullScreen=!0:a.config.fullScreen=!1;let d=[];for(var o=0;o<n.cam.nodes.length;o++){var i=n.cam.nodes[o],t={id:null,value:null,text:null,position:null,isDeletable:null,isDraggable:null,isTextChangeable:null};i.isActive&&(t.id=i.getId(),t.value=i.getValue(),t.text=i.getText(),t.position=i.getPosition(),t.isDeletable=i.getIsDeletable(),t.isDraggable=i.getIsDraggable(),t.isTextChangeable=i.getIsTextChangeable(),d.push(t))}a.CAM.nodes=d;let r=[];for(var o=0;o<n.cam.connectors.length;o++){var l=n.cam.connectors[o],s={id:null,intensity:null,agreement:null,isBidirectional:null,source:null,target:null,isDeletable:null};l.isActive&&(s.id=l.getId(),s.intensity=l.getIntensity(),s.agreement=l.agreement,s.isBidirectional=l.isBidirectional,s.source=l.source,s.target=l.target,s.isDeletable=l.getIsDeletable(),r.push(s))}a.CAM.connectors=r,e("#createdConfigPlusCAM").text(JSON.stringify(a,null,1))}e(function(){e("#dialogSetUpStudy").dialog({autoOpen:!1,modal:!0,show:"fade",hide:!1,resizable:!1,draggable:!0,width:460,maxWidth:460,open:function(){e(".ui-dialog-titlebar").hide(),e(this).dialog({draggable:!1}).parent().draggable(),console.log("dialog got open"),e(".ui-widget-overlay").on("click",function(){e("#dialogSetUpStudy").dialog("close")})},close:function(){console.log("dialog got closed")},position:{my:"center",at:"center",of:e(".boxCAMSVG")}}),e("#createConfigSave").on("click",()=>{e("#dialogSetUpStudy").dialog("open"),c()}),e("#setenableArrows, #setBidirectionalDefault, #setfullScreen, #setenableAmbivalent, #setOnlyStraightCon, #setcameraFeature").click(function(){c()}),e("#setMinNumNodes,#setMaxNumWords, #setMaxLengthChars, #setLanguage").change(function(){c()})}),window.copyText=b}export{f as initCreateConfigSave};
