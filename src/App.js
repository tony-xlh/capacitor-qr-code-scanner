import logo from './logo.svg';
import './App.css';
import './Scanner.css';
import { DBR } from 'capacitor-plugin-dynamsoft-barcode-reader';
import { Toast } from '@capacitor/toast';
import { Capacitor } from '@capacitor/core';

function App() {
  var torchOn = false;
  async function scan() {
    showMessage("Starting")
    try{
      var template = "{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_QR_CODE\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}";
      showControlAndhideBackground();
      var result = await DBR.scan({"template":template});
      hideControlAndRevealBackground();
      let message = result.barcodeFormat+": "+result.barcodeText;
      showMessage(message)
    }catch(e){
      alert(e.message);
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
    if (Capacitor.isNativePlatform()){
      await Toast.show({
        text: message
      });
    }    
    else{
      alert(message);
    }
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
        <button id="scan" onClick={scan}>
            Start Scanning
        </button>
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
