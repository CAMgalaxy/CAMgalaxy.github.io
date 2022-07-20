async function fetchData(URL) {
    const dataRaw = await fetch(URL);
    const data = await dataRaw.json()

    camMother = JSON.parse(data.cam);
    config = JSON.parse(data.config);
    linkRedirect = data.link;

}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const link = urlParams.get('link')
console.log(link);

const URL = "http://127.0.0.1:3001/participants/getOneExperiment?id=62d69047a9b832b91ce51579";
fetchData(link);

