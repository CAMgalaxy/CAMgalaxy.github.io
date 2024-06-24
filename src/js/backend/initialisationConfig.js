if (usingSupabase) {
    async function fetchData(URL) {
        const dataRaw = await fetch(URL);
        console.log("dataRaw", dataRaw);
        if (dataRaw.status != 200) {
            console.log(dataRaw.status);
            return;
        }

        usingSupabase = true;
        const data = await dataRaw.json();
        console.log("data", data.configCAM);

        config = data.configCAM; // JSON.parse(data);
        console.log("config within: ", config);
        
        /*
        linkRedirect = data.link;
        token = data.token
    
        console.log(linkRedirect);
        camMother.nodes.forEach(element => {
            element.kind = "Node";
            element.comment = "";
            element.eventLog = [];
            element.isActive = true;
            element.isConnectorSelected = false;
            element.isSelected = false;
            CAM.importElement(element);
        });
    
        camMother.connectors.forEach(element => {
            element.kind = "Connector";
            element.eventLog = "";
            CAM.importElement(element);
        });
        CAM.draw();
        */
    }

    const queryString2 = window.location.search;
    const urlParams2 = new URLSearchParams(queryString2);
    const link2 = urlParams2.get("link");

    fetchData(link2);

    console.log("config outer: ", config);
}
