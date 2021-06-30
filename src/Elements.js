class Elements {
    constructor() {
        this.idCAM = uuid.v4();
        this.date = (new Date).getUTCSeconds();
        this.elements = [];
        this.currentNode = null;
        this.hasSelectedNode = false;
        this.currentConnector = null;
        this.hasSelectedConnector = false;
        this.readyToMove = false;
    }

    addElement(newElement) {
        const index = this.elements.filter(elt => elt.id === newElement.id);
        if (index.length === 0) {
            this.elements.push(newElement);
            console.log("This element has been added.");
            return;
        }
        console.log("Already existing element.");
        return;
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
                connector.updateConnector("active", true);
            }
        }

    }

    findConnector(node1, node2) {

        const connector = this.elements.filter(elt =>
            elt.kind === "Connector" &&
            ((elt.daughter.id === node1.id && elt.mother.id === node2.id) ||
                (elt.daughter.id === node2.id && elt.mother.id === node1.id))
        );
        return connector[0];
    }

    deleteConnector() {
        this.currentConnector.deleteConnection();
        this.currentConnector.daughter.deleteConnection(this.currentConnector.mother);
        this.currentConnector.mother.deleteConnection(this.currentConnector.daughter);
        this.unselectConnection();

        this.currentConnector = null;
        this.hasSelectedConnector = false;
    }

    deleteNode() {
        const connectors = this.elements.filter(elt => elt.kind === "Connector");
        const nodeID = this.currentNode.id;
        connectors.forEach(element => {
            if (element.daughter.id === nodeID || element.mother.id === nodeID) {
                element.deleteConnection();
            }
        });

        this.currentNode.updateNode("active", false);
        this.unselectNode();

        this.currentNode = null;
        this.hasSelectedNode = false;
    }



    getIndex(id) {

        for (var index = 0; index < this.elements.length; index++) {
            if (this.elements[index].id === id) break;
        }
        return index > -1 ? index : -1;
    }

    updateElement(field, value) {
        if (this.currentNode != null) {
            this.currentNode.updateNode(field, value);
        }
    }



    selecteNode(id) {
        const index = this.getIndex(id);
        if (this.currentNode != null && this.elements[index].id != this.currentNode.id) {
            this.addConnector(this.elements[index]);
            this.unselectNode();
            return true;
        }
        this.hasSelectedNode = true;
        this.currentNode = this.elements[index];
        this.currentNode.updateNode("selected", !this.currentNode.isSelected);
    }

    unselectNode() {
        for (var index = 0; index < this.elements.length; index++) {
            if (this.elements[index].kind === "Node")
                this.elements[index].updateNode("selected", false);
        }
        this.currentNode = null;
        this.hasSelectedNode = false;
    }



    selectConnection(id) {
        const index = this.getIndex(id);
        this.currentConnector = this.elements[index];
        this.hasSelectedConnector = true;

        this.currentConnector.daughter.updateNode("connector", true);
        this.currentConnector.mother.updateNode("connector", true);
    }

    unselectConnection() {

        this.currentConnector.daughter.updateNode("connector", false);
        this.currentConnector.mother.updateNode("connector", false);

        this.currentConnector = null;
        this.hasSelectedConnector = false;

    }



    draw() {
        const svg = document.querySelector("#CAMSVG");
        svg.innerHTML = "";



        let background = document.createElementNS(svgns, "rect");
        background.setAttribute("id", "background");
        background.setAttribute("x", 0);
        background.setAttribute("y", 0);
        background.setAttribute("width", "100%");
        background.setAttribute("height", "100%");
        background.setAttribute("fill", "white");
        

        svg.appendChild(background);
        const connectors = this.elements.filter(elt => elt.kind === "Connector");
        connectors.forEach(elt => {
            if (elt.getIsActive()) svg.appendChild(elt.draw());
        })

        const nodes = this.elements.filter(elt => elt.kind === "Node");

        nodes.forEach(elt => {
            if (elt.getIsActive()) {
                const node = elt.draw();
                svg.appendChild(node);
            }
        })
    }

}