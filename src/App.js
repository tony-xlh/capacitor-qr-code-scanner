import logo from './logo.svg';
import './App.css';
import './Scanner.css';
import { DBR } from 'capacitor-plugin-dynamsoft-barcode-reader';
import { Toast } from '@capacitor/toast';
import { useEffect, useState } from "react";

function App() {
  var torchOn = false;
  let [initialized,setInitialized] = useState(false);

  useEffect(() => {
    async function init() {
      let result = await DBR.initialize();
      console.log(result);
      if (result) {
        if (result.success == true) {
          setInitialized(true);
        }
      }
    }
    init();
  }, []);

  async function startScan() {
    showMessage("Starting")
    try{
      showControlAndhideBackground();
      if (document.getElementById("qrcode").checked){
        let template = "{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_QR_CODE\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}";
        await DBR.initRuntimeSettingsWithString({template: template})
      }
      await DBR.startScan();
      DBR.addListener('onFrameRead', (retObj) => {
        onFrameRead(retObj);
      });
    }catch(e){
      alert(e.message);
    }
  }

  async function onFrameRead(retObj){
    let continuous = document.getElementById("continuous").checked;
    let results = retObj["results"];
    if (results.length>0) {
      if (continuous==false){
        await stopScan();
      }
      var message = ""; 
      for (let index = 0; index < results.length; index++) {
        if (index>0){
          message = message + "\n";
        }
        const result = results[index];
        message = message + result["barcodeFormat"]+": "+result["barcodeText"];
      }
      showMessage(message)
    }
  }

  function showControlAndhideBackground(){
    document.getElementById("controlContainer").style.display="inherit";
    document.getElementsByClassName("App-header")[0].style.display="none";
    //document.getElementsByClassName("App-header")[0].style.backgroundColor="transparent";
  }

  function hideControlAndRevealBackground(){
    //document.getElementsByClassName("App-header")[0].style.backgroundColor="#282c34";
    document.getElementsByClassName("App-header")[0].style.display="flex";
    document.getElementById("controlContainer").style.display="none";
  }
  
  async function showMessage(message){
    await Toast.show({
      text: message
    });
  }

  async function toggleTorch(){
    try{
      let desiredState = true;
      if (torchOn){
        desiredState = false;
      }
      await DBR.toggleTorch({"on":desiredState});
      torchOn = desiredState;
    }catch(e){
      alert(e.message);
    }
  }
  
  async function stopScan(){
    try{
      await DBR.stopScan();
      hideControlAndRevealBackground();
    }catch(e){
      alert(e.message);
    }
  }
    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button id="scan" onClick={startScan} disabled={!initialized}>
            Start Scanning
        </button>
        <label htmlFor="qrcode">Scan QR Code Only<input id="qrcode" value="qrcode" type="checkbox"></input></label>
        <label htmlFor="continuous">Continuous Scan<input id="continuous" value="continuous" type="checkbox"></input></label>
      </header>
      <div id="controlContainer">
        <button className="scanner-control toggleTorch" onClick={toggleTorch}>
            Toggle Torch
        </button>
        <button className="scanner-control close" onClick={stopScan}>
            Close
        </button>
      </div>
    </div>
  );
}

export default App;
