class Elements {
    constructor() {
        this.idCAM = uuid.v4();
        this.date = (new Date).getUTCSeconds();
        this.nodes = [];
        this.connectors = [];
        this.currentNode = null;
        this.hasSelectedNode = false;
        this.currentConnector = null;
        this.hasSelectedConnector = false;
        this.readyToMove = false;
    }

    addElement(newElement) {
        const index = this.nodes.filter(elt => elt.id === newElement.id);
        if (index.length === 0) {
            const kind = newElement.getKind();
            if (kind === "Node") {
                this.nodes.push(newElement);
            }
            if (kind === "Connector") {
                this.connectors.push(newElement);
            }
            console.log("This element has been added.");
            return true;
        }
        console.log("Already existing element.");
        return false;
    }

    deleteElement() {
        if (this.hasSelectedNode) {
            this.deleteNode();
        }

        if (this.hasSelectedConnector) {
            this.deleteConnector()
        }

        this.draw();

    }

    isElementConnected(mother, daughter) {
        return mother.isConnectToNode(daughter);
    }


    addConnector(node) {
        var connector = new ConnectorCAM();

        const success = connector.establishConnection(this.currentNode, node, 3, true);

        if (success) {
            this.addElement(connector);
            console.log("A new connector has been added.");
        }
        if (!success) {
            console.log("A connector already exists.");
            var connector = this.findConnector(this.currentNode, node);
            if (!connector.getIsActive()) {
                console.log("Its state is active again.");
                this.makeBidirectionalConnection(connector.motherID, connector.daughterID);
                connector.updateConnector("active", true);
            }
        }

    }

    makeBidirectionalConnection(motherID, daughterID){

        const mother = this.getNodeById(motherID);
        const daughter = this.getNodeById(daughterID);

        this.currentConnector = this.findConnector(mother, daughter)
        this.currentConnector.makeBidirectionalConnection(mother, daughter);

    }


    makeUnidirectionalConnection(motherID, daughterID){
        const mother = this.getNodeById(motherID);
        const daughter = this.getNodeById(daughterID);
        this.currentConnector.deleteConnection();

        daughter.deleteConnection(this.currentConnector.motherID);
        mother.deleteConnection(this.currentConnector.daughterID);
        
        this.currentConnector.changeConnectionDirection(mother, daughter);

    }


    findConnector(node1, node2) {
        const connector = this.connectors.filter(elt =>
            ((elt.daughterID === node1.id && elt.motherID === node2.id) ||
                (elt.daughterID === node2.id && elt.motherID === node1.id))
        );
        return connector[0];
    }

    deleteConnector() {
        if (!this.currentConnector.getIsDeletable()) {
            console.log("This element cannot be deleted.");
            return;
        }
        CAM.currentConnector.isDeletable
        const mother = this.getNodeById(this.currentConnector.motherID);
        const daughter = this.getNodeById(this.currentConnector.daughterID);
        this.currentConnector.deleteConnection();
        
        daughter.deleteConnection(this.currentConnector.motherID);
        mother.deleteConnection(this.currentConnector.daughterID);

        this.unselectConnection();

        this.currentConnector = null;
        this.hasSelectedConnector = false;
    }

    deleteNode() {
        const nodeID = this.currentNode.id;
        console.log(nodeID);


        if (!this.currentNode.getIsDeletable()) {
            console.log("This element cannot be deleted.");
            return;
        }

        this.connectors.forEach(element => {
            if (element.daughterID === nodeID || element.motherID === nodeID) {
                element.deleteConnection();
            }
        });

        this.currentNode.updateNode("active", false);
        this.unselectNode();

        this.currentNode = null;
        this.hasSelectedNode = false;
    }



    getIndex(id, kind) {

        if (kind === "node") {
            for (var index = 0; index < this.nodes.length; index++) {
                if (this.nodes[index].id === id) break;
            }
        } else {
            for (var index = 0; index < this.connectors.length; index++) {
                if (this.connectors[index].id === id) break;
            }
        }
        return index > -1 ? index : -1;
    }

    updateElement(field, value) {
        if (this.currentNode != null) {
            this.currentNode.updateNode(field, value);
        }
    }



    selecteNode(id) {
        const index = this.getIndex(id, "node");
        if (this.currentNode != null && this.nodes[index].id != this.currentNode.id) {
            this.addConnector(this.nodes[index]);
            this.unselectNode();
            return true;
        }
        this.hasSelectedNode = true;
        this.currentNode = this.nodes[index];
        this.currentNode.updateNode("selected", !this.currentNode.isSelected);
    }

    unselectNode() {
        for (var index = 0; index < this.nodes.length; index++) {
            if (this.nodes[index].kind === "Node")
                this.nodes[index].updateNode("selected", false);
        }
        this.currentNode = null;
        this.hasSelectedNode = false;
    }

    getConnector(id) {
        const index = this.getIndex(id, "connector");
        return this.connectors[index];
    }

    selectConnection(id) {
        const index = this.getIndex(id, "connector");
        this.currentConnector = this.connectors[index];
        this.currentConnector.isSelected = true;
        this.hasSelectedConnector = true;

        const mother = this.getNodeById(this.currentConnector.motherID);
        const daughter = this.getNodeById(this.currentConnector.daughterID);

        daughter.updateNode("connector", true);
        mother.updateNode("connector", true);
    }

    unselectConnection() {

        const mother = this.getNodeById(this.currentConnector.motherID);
        const daughter = this.getNodeById(this.currentConnector.daughterID);

        daughter.updateNode("connector", false);
        mother.updateNode("connector", false);

        this.currentConnector.isSelected = false;

        this.currentConnector = null;
        this.hasSelectedConnector = false;

    }

    getElementNearby(position) {

        for (var elt of this.connectors) {
            if (elt.getIsActive()) {
                const motherPos = this.getNodeById(elt.motherID).position;
                const daughterPos = this.getNodeById(elt.daughterID).position;

                const top = Math.abs((daughterPos.x - motherPos.x) * (motherPos.y - position.y) -
                    (daughterPos.y - motherPos.y) * (motherPos.x - position.x));
                const bot = Math.sqrt((daughterPos.x - motherPos.x) ** 2 + (daughterPos.y - motherPos.y) ** 2);
                const distance = top / bot;
                const xIn = (position.x < Math.max(motherPos.x, daughterPos.x) + 10) && (position.x > Math.min(motherPos.x, daughterPos.x) - 10);
                const yIn = (position.y < Math.max(motherPos.y, daughterPos.y) + 10) && (position.y > Math.min(motherPos.y, daughterPos.y) - 10);

                if ((distance < 10) && xIn && yIn) {
                    //this.selectConnection(elt.id);
                    //elt.isOver = true;
                    return true;
                }
            }
        }
        if (this.hasSelectedConnector) {
            this.unselectConnection();
        }
        return false;
    }


    drawBackground() {
        let background = document.createElementNS(svgns, "rect");
        background.setAttribute("id", "background");
        background.setAttribute("x", 0);
        background.setAttribute("y", 0);
        background.setAttribute("width", "100%");
        background.setAttribute("height", "100%");
        background.setAttribute("fill", "white");
        return background;
    }

    draw() {
        const svg = document.querySelector("#CAMSVG");
        svg.innerHTML = "";

        svg.appendChild(this.drawBackground());

        svg.appendChild(arrowRight);
        svg.appendChild(arrowLeft);

        this.connectors.forEach(elt => {
            if (elt.getIsActive()) {
                const mother = this.getNodeById(elt.motherID);
                const daughter = this.getNodeById(elt.daughterID);
                const node = elt.draw(mother, daughter);
                svg.appendChild(node);
            }
        })

        this.nodes.forEach(elt => {
            if (elt.getIsActive()) {
                const node = elt.draw();
                svg.appendChild(node);
            }
        })
    }

    getNodeById(id) {
        for (var elt of this.nodes) {
            if (elt.id === id) {
                return elt;
            }
        }
        return null;
    }

    importElement(elementList) {
        if (elementList === null) {
            console.log("No element to import.");
            return false;
        }

        var elements = JSON.parse(elementList);
        console.log(typeof elements);

        if (typeof elements === "object" && (element.kind === "Node" || element.kind === "Connector")) {
            elements = [elements];
        }

        elements.forEach(element => {
            if (element.kind === "Node") {
                var node = new NodeCAM(0, "", {
                    x: 0,
                    y: 0
                }, false, false);
                node.setNodeImport(element);
                console.log("A node has been imported.");
                this.nodes.push(node);
            }

            if (element.kind === "Connector") {
                const mother = this.getNodeById(element.mother.id);
                const daughter = this.getNodeById(element.daughter.id);
                var connector = new ConnectorCAM();
                connector.establishConnection(mother, daughter, element.intensity, element.agreement);
                this.connectors.push(connector);
            }
        });
    }
}

