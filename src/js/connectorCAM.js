//const uuidv4 = require("uuid") // to run "npm run test"
//import { v4 as uuidv4 } from 'uuid'; 

class ConnectorCAM {

    constructor(isDeletable = true) {

        this.id = uuid.v4(); // uuidv4.v4(); // to run "npm run test"
        this.value = null;
        this.daughterID = null;
        this.motherID = null;
        this.agreement = null; // shape of line
        this.isActive = null;
        this.date = null;
        this.kind = "Connector"; // information for drawing edges / nodes
        this.isSelected = false;
        this.intensity = 3;
        this.isDeletable = isDeletable;
        this.isOver = false;
        this.eventLog = [];

    }

    setValue(newValue) {
        this.value = newValue;
    }


    updateConnector(field, value) {

        this.enterLog({
            type: field,
            value: value
        });

        if (field === "value") this.setValue(value);
        if (field === "active") this.setIsActive(value);
        if (field === "selected") this.setIsSelected(value);
        if (field === "agreement") this.setAgreement(value);

    }

    setShape() {
        if (this.value < 0) this.shape = "negative";
        if (this.value > 0) this.shape = "positive";
        if (this.value == 0) this.shape = "neutral";
    }

    establishConnection(mother, daughter, intensity, agreement) {


        if (daughter.isConnectToNode(mother.id)) {
            return false;
        }

        this.agreement = agreement;
        this.date = (new Date()).getSeconds();
        this.daughterID = daughter.id;
        this.motherID = mother.id;
        this.isActive = true;
        this.agreement = agreement;
        this.intensity = intensity;

        this.enterLog({
            type: "create connection",
            value: null
        });

        daughter.addConnection(mother.id, "mother");
        mother.addConnection(daughter.id, "daughter");

        console.log(this.daughterID, "<---->", this.motherID);
        console.log("The connection has been established.");

        return true;

    }


    deleteConnection() {

        this.enterLog({
            type: "active",
            value: false
        });

        this.isActive = null;
        console.log("The connection has been destroyed.");
        return true;
    }

    getKind() {
        return this.kind;
    }

    setIsSelected(val) {
        this.isSelected = val;
    }

    getSelected() {
        return this.isSelected;
    }

    getIsActive() {
        return this.isActive;
    }

    setIsActive(val) {
        if (this.isDeletable) {
            this.isActive = val;
        }
    }

    setAgreement(val) {
        this.agreement = val;
    }

    getId() {
        return this.id;
    }

    enterLog(log) {
        this.eventLog.push({
            time: new Date(),
            type: log.type,
            value: log.value
        });
    }

    distanceElement(value) {
        if (value < 0) return 90;
        if (value === 0) return 90;
        if (value === 10) return 90;
        if (value > 0) return 90;
    }

    drawLine(motherD, position, angle, dist, compensation) {
        let newRect = document.createElementNS(svgns, "line");
        newRect.setAttribute("class", "connector");
        newRect.setAttribute("id", this.id);
        newRect.setAttribute("transform", `translate(${position.x},${position.y}) `)
        newRect.setAttribute("x1", (motherD + 50) * Math.cos(angle) * compensation);
        newRect.setAttribute("y1", (motherD + 50) * Math.sin(angle) * compensation);
        newRect.setAttribute("x2", (dist - 50) * Math.cos(angle) * compensation);
        newRect.setAttribute("y2", (dist - 50) * Math.sin(angle) * compensation);
        newRect.setAttribute("stroke", "#808080");
        newRect.setAttribute("stroke-width", this.intensity);

        newRect.setAttribute("marker-start", "url(#arrowRight)");
        newRect.setAttribute("marker-end", "url(#arrowLeft)");

        if (this.isSelected === true) {
            newRect.setAttribute("stroke", "red");
        }

        if (this.agreement === true) {
            newRect.setAttribute("stroke-linecap", "butt");
        }

        if (this.agreement === false) {
            newRect.setAttribute("stroke-dasharray", "20,10");
        }

        return newRect;
    }

    drawOuter(daughter, dist, angle, compensation) {
        let highlight = document.createElementNS(svgns, "line");
        highlight.setAttribute("transform", `translate(${daughter.position.x},${daughter.position.y}) `)
        highlight.setAttribute("class", "outer-connector");
        highlight.setAttribute("id", this.id);
        highlight.setAttribute("x1", 0);
        highlight.setAttribute("y1", 0);
        highlight.setAttribute("x2", (dist) * Math.cos(angle) * compensation);
        highlight.setAttribute("y2", (dist) * Math.sin(angle) * compensation);
        highlight.setAttribute("stroke", "rgba(255, 255, 255, 0)");
        highlight.setAttribute("stroke-width", 30);

        return highlight;
    }

    drawSelected(daughter, dist, angle, compensation) {
        let highlight = document.createElementNS(svgns, "line");
        highlight.setAttribute("transform", `translate(${daughter.position.x},${daughter.position.y}) `)
        highlight.setAttribute("x1", 0);
        highlight.setAttribute("y1", 0);
        highlight.setAttribute("x2", (dist) * Math.cos(angle) * compensation);
        highlight.setAttribute("y2", (dist) * Math.sin(angle) * compensation);
        highlight.setAttribute("stroke", "rgba(142, 218, 211, 0.5)");
        highlight.setAttribute("stroke-width", 20);
        return highlight;
    }

    draw(mother, daughter) {

        const vec = {
            x: (mother.position.x - daughter.position.x),
            y: (mother.position.y - daughter.position.y),
        };
        const dir = {
            x: vec.x / Math.sqrt(vec.x ** 2 + vec.y ** 2),
            y: vec.y / Math.sqrt(vec.x ** 2 + vec.y ** 2)
        };
        const angle = dir.x === 0 ? Math.atan(dir.y / 0.001) : Math.atan(dir.y / dir.x);
        const motherD = Math.sqrt((Math.cos(angle) * 40) ** 2 + (Math.sin(angle) * 20) ** 2);
        const dist = Math.sqrt(vec.x ** 2 + vec.y ** 2) - motherD;
        const compensation = dir.x >= 0 ? 1 : -1;
        const position = {
            "x": daughter.position.x,
            "y": daughter.position.y
        };
        let group = document.createElementNS(svgns, "g");

        const line = this.drawLine(motherD, position, angle, dist, compensation);
        group.appendChild(line);

        const outer = this.drawOuter(daughter, dist, angle, compensation);
        group.appendChild(outer);

        if (mother.isSelected || daughter.isSelected) {
            const selectedDraw = this.drawSelected(daughter, dist, angle, compensation);
            group.appendChild(selectedDraw);
        }
    
        return group;
    }
}