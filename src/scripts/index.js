import '../styles/index.scss';
import { DBR } from 'capacitor-plugin-dynamsoft-barcode-reader';

console.log('webpack starterkit');
let scanned = false;
initDBR();
document.getElementById("controlButton").onclick = toggleScan;
document.getElementById("cameraSelect").onchange = onCameraSelectionChanged;

async function initDBR(){
  let options = {};
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
  await onCameraSelectionChanged();
  await DBR.startScan();
  document.getElementById("controls").style.position = "absolute";
  document.getElementById("controls").style.zIndex = "999";
  document.getElementById("controlButton").innerText = "Stop Scanning";
}

async function onCameraSelectionChanged(){
  let selectedCamera = document.getElementById("cameraSelect").selectedOptions[0].value;
  let selectionResult = await DBR.selectCamera({cameraID:selectedCamera});
  console.log(selectionResult);
}

async function stopScan(){
  document.getElementById("controls").style.position = "";
  document.getElementById("controls").style.zIndex = "";
  await DBR.stopScan();
  document.getElementById("controlButton").innerText = "Start Scanning";
}

function onFrameRead(retObj){
  let results = retObj["results"];
  let message = "";
  if (results.length>0 && scanned == false) {
    scanned = true;
    for (let index = 0; index < results.length; index++) {
      if (index>0){
        message = message + "\n";
      }
      const result = results[index];
      message = message + result["barcodeFormat"]+": "+result["barcodeText"];
    }
    stopScan();
    document.getElementById("result").innerText = message;
  }
}