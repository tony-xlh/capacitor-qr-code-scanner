import '../styles/index.scss';
import { DBR } from 'capacitor-plugin-dynamsoft-barcode-reader';

console.log('webpack starterkit');
let scanned = false;
initDBR();
document.getElementById("controlButton").onclick = toggleScan;
document.getElementById("cameraSelect").onchange = onCameraSelectionChanged;

async function initDBR(){
  let options = {license:"DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ=="};
  let result = await DBR.initialize(options);
  if (result) {
    if (result.success == true) {
      await loadCameras();
      document.getElementById("status").remove();
      document.getElementById("controls").style.display = "";
      DBR.addListener('onFrameRead', (retObj) => {
        onFrameRead(retObj);
      });
    }
  }
}

async function loadCameras(){
  let cameraSelect = document.getElementById("cameraSelect");
  let result = await DBR.getAllCameras();
  console.log(result.cameras);
  result.cameras.forEach(camera => {
    let option = document.createElement("option");
    option.value = camera;
    option.label = camera;
    cameraSelect.appendChild(option);
  });
}

function toggleScan(){
  if (document.getElementById("controlButton").innerText == "Stop Scanning") {
    stopScan();
  }else{
    startScan();
  }
}

async function startScan(){
  scanned = false;
  document.getElementById("result").innerHTML = "";
  await onCameraSelectionChanged();
  await DBR.startScan();
  document.body.style.background = "transparent";
  document.getElementById("controls").className = "fullscreen";
  document.getElementById("controlButton").innerText = "Stop Scanning";
}

async function onCameraSelectionChanged(){
  let selectedCamera = document.getElementById("cameraSelect").selectedOptions[0].value;
  let selectionResult = await DBR.selectCamera({cameraID:selectedCamera});
  console.log(selectionResult);
}

async function stopScan(){
  document.getElementById("controls").className = "";
  await DBR.stopScan();
  document.body.style.background = "white";
  document.getElementById("controlButton").innerText = "Start Scanning";
}

function onFrameRead(retObj){
  let results = retObj["results"];
  if (results.length>0 && scanned == false) {
    scanned = true;
    let ol = document.createElement("ol");

    for (let index = 0; index < results.length; index++) {
      let li = document.createElement("li");
      const result = results[index];
      li.innerText = result["barcodeFormat"]+": "+result["barcodeText"];
      ol.appendChild(li);
    }
    stopScan();
    document.getElementById("result").innerHTML = ol.outerHTML;
  }
}