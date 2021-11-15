import logo from './logo.svg';
import './App.css';
import { DBR,Options } from 'capacitor-plugin-dynamsoft-barcode-reader';
import { Toast } from '@capacitor/toast';

function App() {
    
  async function scan() {
    var result = await DBR.scan({"organizationID":"200001"});
    await Toast.show({
      text: result.barcodeFormat+": "+result.barcodeText
    });
  }
    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={scan}>
            Start Scanning
        </button>
      </header>
    </div>
  );
}

export default App;
