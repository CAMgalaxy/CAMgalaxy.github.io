class NodeCAM {

    constructor(value, text, position, isDraggable = true, isDeletable = true) {
        this.id = uuid.v4();
        this.value = value;
        this.text = text;
        this.comment = "";
        this.position = position;
        this.isActive = true;
        this.isDaughter = false;
        this.isMother = false;
        this.isConnected = false;
        this.wasConnectedTo = [];
        this.motherOf = [];
        this.daughterOf = [];
        this.connectedTo = []
        this.date = (new Date).getSeconds();
        this.kind = "Node";
        this.isSelected = false;
        this.isConnectorSelected = false;
        this.isDraggable = isDraggable;
        this.isDeletable = isDeletable;
        this.hasElementMoved = false;
        this.eventLog = [];

        this.enterLog({
            type: "create node",
            value: value
        });
    }

    setNodeImport(node) {
        this.id = node.id;
        this.value = node.value;
        this.text = node.text;
        this.comment = node.comment;
        this.position = node.position;
        this.isActive = node.isActive;
        this.isDaughter = node.isDaughter;
        this.isMother = node.isMother;
        this.isConnected = node.isConnected;
        this.wasConnectedTo = node.wasConnectedTo;
        this.motherOf = node.motherOf;
        this.daughterOf = node.daughterOf;
        this.connectedTo = node.connectedTo;
        this.date = node.date;
        this.kind = node.kind;
        this.isSelected = node.isSelected;
        this.isConnectorSelected = node.isConnectorSelected;
        this.isDraggable = node.isDraggable;
        this.isDeletable = node.isDeletable;
        this.eventLog = node.eventLog;
    }

    /* set functions */
    setValue(newValue) {
        this.value = newValue;
        return;
    }

    setText(newText) {
        this.text = newText;
        return;
    }

    setComment(newComment) {
        this.comment = newComment;
        return;
    }

    setPosition(newPosition) {
        if (this.isDraggable) {
            this.position = newPosition;
        }
        return;
    }

    setIsActive(val) {
        if (this.isDeletable) {
            this.isActive = val;
        }
        return;
    }

    setIsSelected(val) {
        this.isSelected = val;
    }

    setIsConnectorSelected(val) {
        this.isConnectorSelected = val;
    }

    /* get functions */
    getValue() {
        return this.value;
    }

    getText() {
        return this.text;
    }

    getComment() {
        return this.comment;
    }

    getPosition() {
        return this.position;
    }


    getIsActive() {
        return this.isActive;
    }

    getIsSelected() {
        return this.isSelected;
    }

    getIsConnectorSelected() {
        return this.isConnectorSelected;
    }

    getKind() {
        return this.kind;
    }

    getIsDeletable() {
        return this.isDeletable;
    }

    /* functions */
    isConnectToNode(nodeID) {
        const connectedElement = this.wasConnectedTo.filter(elt => elt === nodeID);
        return connectedElement.length === 0 ? false : true;
    }

    addConnection(nodeID, kind) {

        if (this.isConnectToNode(nodeID)) { // why this lines of code?
            console.log("A connection is already existing...");
            return false;
        }

        this.enterLog({
            type: "add connection",
            value: null
        });

        if (kind === "mother") this.addDaughter(nodeID);
        if (kind === "daughter") this.addMother(nodeID);
        this.addConnectTo(nodeID);

        this.updateWasConnected(nodeID);

        return true;
    }

    addConnectTo(nodeID) {
        this.isConnected = true;
        this.connectedTo.push(nodeID);
    }
    addDaughter(nodeID) {
        this.isMother = true;
        this.motherOf.push(nodeID);
    }
    addMother(nodeID) {
        this.isDaughter = true;
        this.daughterOf.push(nodeID);
    }
    updateWasConnected(nodeID) {
        const ids = this.connectedTo.map(elt => elt.id);
        if (!ids.includes(nodeID)) {
            this.wasConnectedTo.push(nodeID);
        }
        //this.wasConnectedTo = [...new Set(this.wasConnectedTo)]
    }


    deleteConnection(nodeID) {
        const id = nodeID;

        this.enterLog({
            type: "delete connection",
            value: null
        });

        this.deleteConnectedTo(id);
        this.deleteMother(id);
        this.deleteDaughter(id);

        this.updateWasConnected(nodeID);

        if (this.connectedTo.length === 0) this.isConnected = false;
        return true;
    }


    deleteConnectedTo(id) {
        this.connectedTo = this.connectedTo.filter(elt => elt.id != id);
        if (this.connectedTo.length === 0) this.isConnected = false;
    }
    deleteDaughter(id) {
        this.motherOf = this.motherOf.filter(elt => elt.id != id);
        if (this.motherOf.length === 0) this.isMother = false;
    }
    deleteMother(id) {
        this.daughterOf = this.daughterOf.filter(elt => elt.id != id);
        if (this.daughterOf.length === 0) this.isDaughter = false;
    }

    updateNode(field, value) {

        this.enterLog({
            type: field,
            value: value
        });

        if (field === "text") this.setText(value);
        if (field === "position") this.setPosition(value);
        if (field === "value") this.setValue(value);
        if (field === "comment") this.setComment(value);
        if (field === "active") this.setIsActive(value);
        if (field === "selected") this.setIsSelected(value);
        if (field === "connector") this.setIsConnectorSelected(value);

    }

    enterLog(log) {
        this.eventLog.push({
            time: new Date(),
            type: log.type,
            value: log.value
        });
    }

    deletenode() {
        this.active = false;
    }

    getId() {
        return this.id;
    }

    isNode() {
        return true;
    }

    printOut() {
        console.table(this);
    }

    draw() {

        let group = document.createElementNS(svgns, "g");
        group.setAttribute("transform", `translate(${this.position.x},${this.position.y}) scale(${zoomScale})`)


        //let newRect = document.createElementNS(svgns, "rect");


        group.appendChild(this.getShapeSVG());
        group.appendChild(this.getTextSVG());

        return group;
    }

    getTextSVG() {

        let newText = document.createElementNS(svgns, "text");
        newText.setAttribute("id", this.id);
        newText.setAttribute("class", "noselect node");
        newText.setAttribute("x", 0);
        newText.setAttribute("y", 0);
        newText.setAttribute("fill", "black");
        newText.setAttribute("alignment-baseline", "middle")
        newText.setAttribute("text-anchor", "middle")
        newText.innerHTML = this.text;
        return newText;
    }


    getShapeSVG() {
        // positive concept
        if (this.value >= 1 && this.value < 5) {
            let newRect = document.createElementNS(svgns, "ellipse");
            newRect.setAttribute("id", this.id);
            newRect.setAttribute("class", "node");
            newRect.setAttribute(null, "cx", 0);
            newRect.setAttribute(null, "cy", 0);
            newRect.setAttribute("rx", "100");
            newRect.setAttribute("ry", "70");
            newRect.setAttribute("transform", "translate(0,0)")

            newRect.setAttribute("fill", "#B9F1B9");
            newRect.setAttribute("stroke", "#22AA22");
            newRect.setAttribute("stroke-width", this.value * 3);

            if (this.isSelected === true) {
                newRect.setAttribute("fill", "#C0FAC8");
                newRect.setAttribute("stroke", highlightSelected);
            }
            if (this.isConnectorSelected === true) {
                newRect.setAttribute("fill", highlightAdjacent);
            }
            return newRect;
        }

        // negative concept
        if (this.value < 0) {
            let newRect = document.createElementNS(svgns, "polygon");
            newRect.setAttribute("id", this.id);
            newRect.setAttribute("class", "node");
            newRect.setAttribute("points", "-100,0 -60,-60 60,-60 100,0 60,60 -60,60");
            newRect.setAttribute("transform", "translate(0,0)")

            newRect.setAttribute("fill", "#EB8989");
            newRect.setAttribute("stroke", "#e04848");
            newRect.setAttribute("stroke-width", this.value * -3);
            if (this.isSelected === true) {
                newRect.setAttribute("stroke", highlightSelected);
            }
            if (this.isConnectorSelected === true) {
                newRect.setAttribute("fill", highlightAdjacent);
            }
            return newRect;
        }

        // ambivalent concept
        /*
approximation ellipse using polygon: https://stackoverflow.com/questions/22694850/approximating-an-ellipse-with-a-polygon
append child: https://stackoverflow.com/questions/55286191/combine-two-svg-elements-into-one-using-javascript
            */
           /*
        if (this.value === 10) {
            var mergedSvg = document.createElementNS(svgns, 'svg');
            // ellipse
            let newRect2 = document.createElementNS(svgns, "ellipse");
            newRect2.setAttribute(null, "cx", 0);
            newRect2.setAttribute(null, "cy", 0);
            newRect2.setAttribute("rx", "100");
            newRect2.setAttribute("ry", "70");
            newRect2.setAttribute("transform", "translate(0,0)")

            newRect2.setAttribute("fill", "rgb(247, 151, 226)");
            newRect2.setAttribute("stroke", "rgb(142, 19, 146)");
            newRect2.setAttribute("stroke-width", "3");

            // polygon
            let newRect = document.createElementNS(svgns, "polygon");
            newRect.setAttribute("id", this.id);
            newRect.setAttribute("class", "node");
            newRect.setAttribute("points", "-100,0 -60,-60 60,-60 100,0 60,60 -60,60");
            newRect.setAttribute("transform", "translate(0,0)")

            newRect.setAttribute("fill", "rgb(247, 151, 226)");
            newRect.setAttribute("stroke", "rgb(142, 19, 146)");
            newRect.setAttribute("stroke-width", "3");

            if (this.isSelected === true) {
                newRect.setAttribute("stroke", highlightSelected);
            }
            if (this.isConnectorSelected === true) {
                newRect.setAttribute("fill", highlightAdjacent);
            }

            mergedSvg.appendChild(newRect);
            mergedSvg.appendChild(newRect2);

            return mergedSvg;
        }
*/


        if (this.value === 10) {
            let newRect = document.createElementNS(svgns, "polygon");
            newRect.setAttribute("id", this.id);
            newRect.setAttribute("class", "node");
            newRect.setAttribute("points", "-100,0 -60,-60 60,-60 100,0 60,60 -60,60");
            newRect.setAttribute("transform", "translate(0,0)")

            newRect.setAttribute("fill", "rgb(247, 151, 226)");
            newRect.setAttribute("stroke", "rgb(142, 19, 146)");
            newRect.setAttribute("stroke-width", "3");

            if (this.isSelected === true) {
                newRect.setAttribute("stroke", highlightSelected);
            }
            if (this.isConnectorSelected === true) {
                newRect.setAttribute("fill", highlightAdjacent);
            }

            return newRect;
        }

        if (this.value === 10) {
            let newRect = document.createElementNS(svgns, "ellipse");
            newRect.setAttribute("id", this.id);
            newRect.setAttribute("class", "node");
            newRect.setAttribute(null, "cx", 0);
            newRect.setAttribute(null, "cy", 0);
            newRect.setAttribute("rx", "100");
            newRect.setAttribute("ry", "70");
            newRect.setAttribute("transform", "translate(0,0)")

            newRect.setAttribute("fill", "rgb(247, 151, 226)");
            newRect.setAttribute("stroke", "rgb(142, 19, 146)");
            newRect.setAttribute("stroke-width", "3");

            if (this.isSelected === true) {
                newRect.setAttribute("stroke", highlightSelected);
            }
            if (this.isConnectorSelected === true) {
                newRect.setAttribute("fill", highlightAdjacent);
            }

            return newRect;
        }


        // neutral concept
        if (this.value === 0) {
            let newRect = document.createElementNS(svgns, "rect");
            newRect.setAttribute("id", this.id);
            newRect.setAttribute("class", "node");
            newRect.setAttribute("x", -100);
            newRect.setAttribute("y", -60);
            newRect.setAttributeNS(null, 'width', '200');
            newRect.setAttributeNS(null, 'height', '120');
            newRect.setAttribute("transform", "translate(0,0)")

            newRect.setAttribute("fill", "#F0EEC0");
            newRect.setAttribute("stroke", "#F3F033");
            newRect.setAttribute("stroke-width", "5");
            if (this.isSelected === true) {
                newRect.setAttribute("stroke", highlightSelected);
            }
            if (this.isConnectorSelected === true) {
                newRect.setAttribute("fill", highlightAdjacent);
            }
            return newRect;
        }
    }
}




//module.exports = NodeCAM;