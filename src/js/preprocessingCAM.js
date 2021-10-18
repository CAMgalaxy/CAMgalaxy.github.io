/* 
Class for pre-processing CAM data used to
- check necessary conditions (like #nodes)
*/

// set cytoscape container to add elements
var cy = cytoscape({
    //very commonly used options
    //container: document.getElementById('cy'), // container to render in
    elements: [ /* ... */ ],
    style: cytoscape.stylesheet()
        .selector('node')
        .style({
            'background-color': 'blue'
        }),
    layout: {
        name: 'grid' /* , ... */
    },
    data: {
        /* ... */
    },

    // initial viewport state:
    zoom: 1,
    pan: {
        x: 0,
        y: 0
    },

    // interaction options:
    minZoom: 1e-50,
    maxZoom: 1e50,
    zoomingEnabled: false,
    userZoomingEnabled: false,
    panningEnabled: false,
    userPanningEnabled: false,
    boxSelectionEnabled: true,
    selectionType: 'single',
    autolock: false,
    autoungrabify: false,
    autounselectify: false,

    // rendering options:
    headless: false,
    styleEnabled: false, // set off rendering
    hideEdgesOnViewport: false,
    textureOnViewport: false,
    motionBlur: false,
    pixelRatio: 'auto'
});






// add nodes and edges to cy 
function addElementsCy() {
   // var CAMnodesCy = CAM.nodes.filter(element => element.isActive === true);
   // var CAMconnectorsCy = CAM.connectors.filter(element => element.isActive === true);

    // console.log("connectors within Cy: ", CAMconnectorsCy);
    // add nodes
    CAM.nodes.forEach(elt => { //  CAM.nodes -> only active nodes here
        //(new Node(elt))
        if (elt.getIsActive()) {
            cy.add([{
                group: 'nodes',
                data: {
                    id: elt.id,
                    weight: elt.getValue()
                },
                position: {
                    x: elt.getPosition().x,
                    y: elt.getPosition().y
                }
            }]);
        }
    });

    // add connectors
    var h = 0;
    CAM.connectors.forEach(elt => { //   CAM.connectors -> only active connectors here
        //(new Node(elt))
        if (elt.getIsActive()) {
            cy.add([{
                group: 'edges',
                data: {
                    id: elt.id,
                    source: elt.motherID,
                    target: elt.daughterID
                }
            }]);
            h += 1;
        }
    });
    console.log("num of active connectors: ", h);
}

// adjusted bfs algorithm
function bfsAlgorithm(rootsnode) {
    var NodesIDs = [];
    var timesRun = 0;

    while (cy.nodes().length > NodesIDs.length) {
        timesRun += 1;

        if (timesRun > 1) {
            var i = 0;
            // could be written more efficient
            while (NodesIDs.some((element) => element === cy.nodes()[i].id())) {
                i += 1;
            }
            rootsnode = cy.nodes()[i];
        }

        var bfs = cy.elements().bfs({
            roots: rootsnode,
            visit: function (v, e, u, i, depth) {
                // console.log('bfs visited ' + v.id());
    
            },
            directed: false
        });

        var NodesPathtmp = bfs.path.filter((element) => element.group() === "nodes");
        NodesPathtmp.forEach(element => NodesIDs.push(element.id()));
        //console.log("bfs visited -> Nodes IDs: ", NodesIDs, "in round: ", timesRun);
    }

    // set added nodes and edges to zero: 
    cy.remove(cy.elements());

    return timesRun;
}




/*
$(function () {
    addElementsCy();
    console.log("nodes: ", cy.nodes());
    var ResbfsAl = bfsAlgorithm("#" + cy.nodes()[0].id());
    console.log("num of groups: ", ResbfsAl);

})
*/




/*
class NodeForPreprocessing {
    constructor(node) {
        this.id = node.id;
        this.connectedTo = [..., node.motherOf, node.daughterOf];
        this.visited = false;
    }
}



function getListNodes(){
    const listofNodes = [];
    CAM.nodes.forEach(elt => {
        (new Node(elt))
    })
    return listofNodes
}





function breadAlgo(listOfNodes){
    nodes = getListNodes()
    //do stuff
    return Fullsyconnected === true ? true : false;
}
// ########################

function highestDegree(listOfNodes){
}
        this.breadthFirstVisited = [];

      */


        /*
            // cytoscape cannot handle long ids
    for (var i = 0; i < cy.nodes().length; i++) {
        var tmpID = cy.nodes()[i].id();
        var tmpNewID = "n" + i;

        cy.nodes()[i].data().id = tmpNewID;

        for (var j = 0; j < cy.edges().length; j++) {
            if (cy.edges()[j].data().source === tmpID) {
                cy.edges()[j].data().source == tmpNewID;
            }
            if (cy.edges()[j].data().target === tmpID) {
                cy.edges()[j].data().target == tmpNewID;
            }
        }
    }
    */