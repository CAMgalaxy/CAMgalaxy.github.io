/* add button: */
const buttonDelete = `<button id="deleteCAM" class="material-icons" style="color:red;" title="Delete CAM" onclick="deleteCam()"> delete</button>`;
var target = document.getElementById("rightButton");
target.innerHTML += buttonDelete;


function deleteCam() {
    let confirmdel = confirm("Do you really want to delete your CAM? No data will be saved on the server.");
    if (confirmdel == true) {
        CAM.connectors = [];
        CAM.nodes = [];
        toastr.error('You CAM has been deleted. No data will be saved on the server. Default CAM has been restored.');
        console.log("complete CAM has been deleted");

        defaultCAM()
    }
}