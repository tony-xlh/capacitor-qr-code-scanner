import logo from './logo.svg';
import './App.css';
import { DBR } from 'capacitor-plugin-dynamsoft-barcode-reader';
import { Toast } from '@capacitor/toast';
import { Capacitor } from '@capacitor/core';

function App() {

  async function scan() {
    document.getElementById("scan").setAttribute("disabled","");
    var result = await DBR.scan({"organizationID":"200001"});
    document.getElementById("scan").removeAttribute("disabled");
    let message = result.barcodeFormat+": "+result.barcodeText;
    if (Capacitor.isNativePlatform === true){
      await Toast.show({
        text: message
      });
    }else{
      alert(message);
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
    </div>
  );
}

export default App;
