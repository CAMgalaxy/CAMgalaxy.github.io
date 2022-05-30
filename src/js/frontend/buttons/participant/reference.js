const ref = `

<div class="reference">
    <div class="tab">
        <button class="tablinks" onclick="openTab(event, 'QRLegend')">Legend</button>
        <button class="tablinks" onclick="openTab(event, 'QRusingConcepts')">Concept</button>
        <button class="tablinks" onclick="openTab(event, 'QRusingConnections')">Connection</button>
        <button class="tablinks" onclick="openTab(event, 'QRButtons')">Buttons</button>
    </div>
    <!-- interactive component: DEFAULT -->
    <div id="informationDefault" class="tab-defaulttext">
        <i>${languageFileOut.qr_start}</i>
            
    </div>

    <div id="QRLegend" class="tabcontent">

        <h3>Every concept is given a basic emotional value:</h3>
        <ul style="list-style-type:none; margin: 0px; padding: 0px;">
            <li><img src="./img/pos_node.svg#svgView(viewBox(0,5,210,110))" alt=""
                    style="width: 50px; height: 40px; vertical-align:middle;"> Positive concept</li>
            <li><img src="./img/neg_node.svg#svgView(viewBox(5,5,250,120))" alt=""
                    style="width: 50px; height: 40px; vertical-align:middle;"> Negative concept</li>
            <div id="hideAmvivalentNode">
                <li><img src="./img/ambivalent_node.svg#svgView(viewBox(5,5,250,120))" alt=""
                    style="width: 50px; height: 40px; vertical-align:middle;"> Ambivalent concept</li>
            </div>
            <li><img src="./img/neutral_node.svg#svgView(viewBox(0,5,180,120))" alt=""
                    style="width: 50px; height: 40px; vertical-align:middle;"> Neutral concept</li>
            <h3>Draw links between concepts that are related to each other:</h3>
            <li><img src="./img/solid_lini_mini.svg" alt=""
                    style="width: 50px; height: 40px; vertical-align:middle;"> Concepts support each other
            </li>
            <div id="hideSliderDisAgreeRef">
                <li><img src="./img/dashed_lini_mini.svg" alt=""
                    style="width: 50px; height: 40px; vertical-align:middle;"> Concepts inhibit each other
                </li>
            </div>
            <div id="showCameraFeature">
                <h3>Move your Cognitive-Affective Map</h3> by moving your cursor to the edge of the drawing
                window (grey area):
                <img src="./img/cameraFeature.JPG" alt=""
                    style="width: 260px; height: 120px; vertical-align:text-top;">
            </div>
        </ul>
    </div>

    <div id="QRusingConcepts" class="tabcontent">
        <h3>Create, update, delete concepts: </h3>
        <ul style="list-style-type:none; margin: 0px; padding: 0px;">
            <li><b>Create:</b> Single click on blank drawing space</li>
            <li><b>Update:</b> Double click on existing concept</li>
            <li><b>Delete:</b> Double click on existing concept and press on the “trash bin” symbol top right.
            </li>
        </ul>

        <h3>Change content of concepts: </h3>
        <ul style="list-style-type:none; margin: 0px; padding: 0px;">
            <li><b>Add text:</b> Change the content of the concept (use only single words)</li>
            <li><b>Change type and strength:</b> Use the slider to change the emotional attribution and strength
                of the concept</li>
            <li><b>Add comment:</b> type comment in the “Comment” section</li>
        </ul>
    </div>

    <div id="QRusingConnections" class="tabcontent">
        <h3>Create, update, delete connections: </h3>
        <ul style="list-style-type:none; margin: 0px; padding: 0px;">
            <li><b>Create:</b> Click on two concepts to draw a connection</li>
            <li><b>Update:</b> Double click on existing connection</li>
            <li><b>Delete:</b> Double click on existing concept and press on the “trash bin” symbol top right.
            </li>
        </ul>

        <h3>Change content of connections: </h3>
        <ul style="list-style-type:none; margin: 0px; padding: 0px;">
        <div id="hideSliderDisAgreeRef2">
            <li><b>Change type and strength:</b> Use the slider to change the type (agreement or disagreement)
                and strength of the connection</li>
        </div>
        <div id="showSliderAgreeOnlyRef">
            <li><b>Change strength:</b> Use the slider to change the strength of the connection</li>
        </div>

        
            <div id="hideConnectorDirInfluence">
            <li style="margin-top: 10px;"><b>Direction of Influence:</b> </li>
            <li style="padding-left: 10px;"><span style="vertical-align:middle;"
                    class="material-icons">sync_alt</span> Concepts influence each other</li>
            <li style="padding-left: 10px;"><span style="vertical-align:middle;"
                    class="material-icons">trending_flat</span> Concepts influence each other in a one-sided
                direction from left to right.</li>
                </div>
        </ul>
    </div>

    <div id="QRButtons" class="tabcontent">

        <h3>Clicking on the buttons in the upper bar leads to the following results: </h3>
        <ul style="list-style-type:none; margin: 0px; padding: 0px;">
            <li>
                <div class="material-icons" style="vertical-align:middle;">save</div> save Cognitive
                Affective Map and send data to the server
            </li>
            <br>
            <li>
                <div class="material-icons" style="vertical-align:middle;">crop_original</div> download
                Cognitive Affective Map as a picture
            </li>
            <br>
            <li>
                <div class="material-icons" style="color:red; vertical-align:middle;">delete</div> delete
                Cognitive Affective Map and no data will be send to the server
            </li>
        </ul>

    </div>
</div>`;


var target = document.getElementById("dialogReference");
target.innerHTML += ref;



