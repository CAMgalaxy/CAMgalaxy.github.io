//const uuidv4 = require("uuid") // to run "npm run test"
//import { v4 as uuidv4 } from 'uuid'; 

class ConnectorCAM {

    constructor(isDeletable = true) {

        this.id = uuid.v4(); // uuidv4.v4(); // to run "npm run test"
        this.value = null;
        this.daughter = null;
        this.mother = null;
        this.agreement = null; // shape of line
        this.isActive = null;
        this.date = null;
        this.kind = "Connector"; // information for drawing edges / nodes
        this.isSelected = false;
        this.intensity = 3;
        this.isDeletable = isDeletable;
        this.eventLog = [];

    }

    setValue(newValue) {
        this.value = newValue;
    }


    updateConnector(field, value) {

        this.enterLog({type: field, value: value});

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


        if (daughter.isConnectToNode(mother)) {
            return false;
        }

        this.agreement = agreement;
        this.date = (new Date()).getSeconds();
        this.daughter = daughter;
        this.mother = mother;
        this.isActive = true;
        this.agreement = agreement;
        this.intensity = intensity;

        this.enterLog({type: "create connection", value: null});

        daughter.addConnection(mother, "mother");
        mother.addConnection(daughter, "daughter");

        console.log("The connection has been established.");

        return true;

    }


    deleteConnection() {

        this.enterLog({type: "active", value: false});

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
        if (this.isDeletable){
            this.isActive = val;
        }
    }

    setAgreement(val)
    {
        this.agreement = val;
    }

    getId() {
        return this.id;
    }

    enterLog(log){
        this.eventLog.push({
            time: new Date(),
            type: log.type,
            value: log.value
        });
    }

    distanceElement(value) {
        if (value < 0) return 0;
        if (value === 0) return 0;
        if (value === 10) return 0;
        if (value > 0) return 0;
    }

    draw() {

        const vec = {
            x: (this.mother.position.x - this.daughter.position.x),
            y: (this.mother.position.y - this.daughter.position.y),
        };
        const dir = {
            x: vec.x / Math.sqrt(vec.x ** 2 + vec.y ** 2),
            y: vec.y / Math.sqrt(vec.x ** 2 + vec.y ** 2)
        };
        const dist = Math.sqrt(vec.x ** 2 + vec.y ** 2);
        const angle = dir.x === 0 ? Math.atan(dir.y / 0.001) : Math.atan(dir.y / dir.x);
        const compensation = dir.x >= 0 ? 1 : -1;

        let newRect = document.createElementNS(svgns, "line");
        newRect.setAttribute("class", "connector");
        newRect.setAttribute("id", this.id);
        newRect.setAttribute("transform", `translate(${this.daughter.position.x},${this.daughter.position.y}) `)
        newRect.setAttribute("x1", this.distanceElement(this.daughter.value) * Math.cos(angle) * compensation);
        newRect.setAttribute("y1", this.distanceElement(this.daughter.value) * Math.sin(angle) * compensation);
        newRect.setAttribute("x2", (dist - this.distanceElement(this.mother.value)) * Math.cos(angle) * compensation);
        newRect.setAttribute("y2", (dist - this.distanceElement(this.mother.value)) * Math.sin(angle) * compensation);
        newRect.setAttribute("stroke", "#808080");
        newRect.setAttribute("stroke-width", this.intensity);

        if (this.mother.isSelected || this.daughter.isSelected) {
            newRect.setAttribute("stroke", "#493F54");
        }
        if (this.agreement === true) {
            newRect.setAttribute("stroke-linecap", "butt");
        }
        if (this.agreement === false) {
            newRect.setAttribute("stroke-dasharray", "20,10");
        }


        return newRect;
    }
}