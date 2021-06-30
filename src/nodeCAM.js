class NodeCAM {

    constructor(value, text, position) {
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
        this.eventLog = [];

        this.enterLog({type: "create node", value: value});
    }

    setText(newText) {
        this.text = newText;
        return;
    }

    setComment(newComment) {
        this.comment = newComment;
        return;
    }

    setValue(newValue) {
        this.value = newValue;
        return;
    }

    setPosition(newPosition) {
        this.position = newPosition;
        return;
    }

    setIsActive(val) {
        this.isActive = val;
        return;
    }

    setIsSelected(val) {
        this.isSelected = val;
    }

    getIsSelected() {
        return this.isSelected;
    }

    setConnectorSelected(val) {
        this.isConnectorSelected = val;
    }

    getConnectorSelected() {
        return this.isConnectorSelected;
    }

    getPosition() {
        return this.position;
    }

    getValue() {
        return this.value;
    }

    getText() {
        return this.text;
    }

    getComment() {
        return this.comment;
    }

    getIsActive() {
        return this.isActive;
    }

    getKind() {
        return this.kind;
    }

    isConnectToNode(node) {
        const connectedElement = this.wasConnectedTo.filter(elt => elt === node.id);
        return connectedElement.length === 0 ? false : true;
    }


    addConnection(node, kind) {

        if (this.isConnectToNode(node)) {
            console.log("A connection is already existing...");
            return false;
        }

        this.enterLog({type: "add connection", value: null});

        if (kind === "mother") this.addDaughter(node);
        if (kind === "daughter") this.addMother(node);
        this.addConnectTo(node);
        
        this.updateWasConnected(node);

        return true;
    }

    addConnectTo(node) {
        this.isConnected = true;
        this.connectedTo.push(node.id);
    }
    addDaughter(node) {
        this.isMother = true;
        this.motherOf.push(node.id);
    }
    addMother(node) {
        this.isDaughter = true;
        this.daughterOf.push(node.id);
    }
    updateWasConnected(node){
        const ids = this.connectedTo.map(elt => elt.id);
        if (!ids.includes(node.id)){
            this.wasConnectedTo.push(node.id);
        }
        //this.wasConnectedTo = [...new Set(this.wasConnectedTo)]
    }


    deleteConnection(node) {
        const id = node.id;

        this.enterLog({type: "delete connection", value: null});

        this.deleteConnectedTo(id);
        this.deleteMother(id);
        this.deleteDaughter(id);

        this.updateWasConnected(node);

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

        this.enterLog({type: field, value: value});

        if (field === "text") this.setText(value);
        if (field === "position") this.setPosition(value);
        if (field === "value") this.setValue(value);
        if (field === "comment") this.setComment(value);
        if (field === "active") this.setIsActive(value);
        if (field === "selected") this.setIsSelected(value);
        if (field === "connector") this.setConnectorSelected(value);

    }

    enterLog(log){
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
        group.setAttribute("transform", `translate(${this.position.x},${this.position.y})`)


        //let newRect = document.createElementNS(svgns, "rect");


        group.appendChild(this.getShapeSVG());
        group.appendChild(this.getTextSVG());

        return group;
    }

    getTextSVG() {

        let newText = document.createElementNS(svgns, "text");
        newText.setAttribute("id", this.id);
        newText.setAttribute("x", 0);
        newText.setAttribute("y", 0);
        newText.setAttribute("fill", "black");
        newText.setAttribute("alignment-baseline", "middle")
        newText.setAttribute("text-anchor", "middle")
        newText.setAttribute("class", "noselect")
        //newText.setAttribute("font-size", "30px")
        newText.innerHTML = this.text;
        return newText;
    }

    getShapeSVG() {
        if (this.value < 0 && this.value >=-3) {
            let newRect = document.createElementNS(svgns, "polygon");
            newRect.setAttribute("id", this.id);
            newRect.setAttribute("class", "node");
            newRect.setAttribute("points", "10,200 60,150 200,150 250,200 200,250 60,250");
            newRect.setAttribute("transform", `translate(-130,-200)`)
            newRect.setAttribute("stroke", "#E91010");
            newRect.setAttribute("x", 0);
            newRect.setAttribute("y", 0);
            newRect.setAttribute("fill", "#EB8989");
            newRect.setAttribute("stroke-width", this.value*-3);

            if (this.isSelected === true) {
                newRect.setAttribute("stroke", "black");
            }
            if (this.isConnectorSelected === true) {
                newRect.setAttribute("fill", "blue");
            }

            return newRect;
        }


        if (this.value === 0) {
            let newRect = document.createElementNS(svgns, "polygon");
            newRect.setAttribute("id", this.id);
            newRect.setAttribute("class", "node");
            newRect.setAttribute("x", 0);
            newRect.setAttribute("y", 0);
            newRect.setAttribute("points", "0,0 150,0 150,100 0,100");
            newRect.setAttribute("transform", `translate(-75,-50)`)

            newRect.setAttribute("fill", "#F0EEC0");
            newRect.setAttribute("stroke", "#F3F033");
            newRect.setAttribute("stroke-width", "5");


            if (this.isSelected === true) {
                newRect.setAttribute("stroke", "black");
            }

            if (this.isConnectorSelected === true) {
                newRect.setAttribute("fill", "blue");
            }


            return newRect;
        }

        if (this.value >=1 && this.value < 4) {
            let newRect = document.createElementNS(svgns, "ellipse");
            newRect.setAttribute("id", this.id);
            newRect.setAttribute("class", "node");
            newRect.setAttribute(null, "cx", 0);
            newRect.setAttribute(null, "cy", 0);
            newRect.setAttribute("rx", "100");
            newRect.setAttribute("ry", "50");
            newRect.setAttribute("transform", "translate(0,0)")
            newRect.setAttribute("fill", "#B9F1B9");
            newRect.setAttribute("stroke", "#22AA22");
            newRect.setAttribute("stroke-width",  this.value*3);


            if (this.isSelected === true) {
                newRect.setAttribute("fill", "#C0FAC8");
                newRect.setAttribute("stroke", "black");
            }

            if (this.isConnectorSelected === true) {
                newRect.setAttribute("fill", "blue");
            }


            return newRect;
        }

        if (this.value === 10) {

            let group = document.createElementNS(svgns, "g");

            let newEllipse = document.createElementNS(svgns, "ellipse");
            newEllipse.setAttribute("id", this.id);
            newEllipse.setAttribute("class", "node");
            newEllipse.setAttribute(null, "cx", 0);
            newEllipse.setAttribute(null, "cy", 0);
            newEllipse.setAttribute("rx", "100");
            newEllipse.setAttribute("ry", "50");
            newEllipse.setAttribute("transform", "translate(0,0)");
            newEllipse.setAttribute("fill", "rgb(247, 151, 226)");
            newEllipse.setAttribute("stroke", "rgb(142, 19, 146)");
            newEllipse.setAttribute("stroke-width", "3");

            let newPoly = document.createElementNS(svgns, "polygon");
            newPoly.setAttribute("id", this.id);
            newPoly.setAttribute("class", "node");
            newPoly.setAttribute("points", "10,200 60,150 200,150 250,200 200,250 60,250");
            newPoly.setAttribute("transform", `translate(-130,-200)`)
            newPoly.setAttribute("stroke", "rgb(142, 19, 146)");
            newPoly.setAttribute("x", 0);
            newPoly.setAttribute("y", 0);
            newPoly.setAttribute("fill", "rgb(247, 151, 226)");
            newPoly.setAttribute("stroke-width", "5");

            if (this.isSelected === true) {
                newPoly.setAttribute("stroke", "black");
            }

            group.appendChild(newPoly);
            group.appendChild(newEllipse);

            return group;
        }

    }

}

//module.exports = NodeCAM;