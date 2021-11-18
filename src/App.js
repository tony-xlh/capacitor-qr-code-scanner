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
      showControlAndhideBackground();
      var result = await DBR.scan();
      hideControlAndRevealBackground();
      let message = result.barcodeFormat+": "+result.barcodeText;
      showMessage(message)
    }catch(e){
      alert(e.message);
    }
  }

  function showControlAndhideBackground(){
    document.getElementById("scannerControl").style.display="inherit";
    document.getElementsByClassName("App-header")[0].style.display="none";
    //document.getElementsByClassName("App-header")[0].style.backgroundColor="transparent";
  }

  function hideControlAndRevealBackground(){
    //document.getElementsByClassName("App-header")[0].style.backgroundColor="#282c34";
    document.getElementsByClassName("App-header")[0].style.display="flex";
    document.getElementById("scannerControl").style.display="none";
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

  function toggleTorch(){
    try{
      let desiredState = true;
      if (torchOn){
        desiredState = false;
      }
      DBR.toggleTorch({"on":desiredState});
      torchOn = desiredState;
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
      <div id="scannerControl" >
        <button onClick={toggleTorch}>
            Toggle Torch
        </button>
      </div>
    </div>
  );
}

export default App;
