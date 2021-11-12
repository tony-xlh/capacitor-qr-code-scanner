import logo from './logo.svg';
import './App.css';
import { Toast } from '@capacitor/toast';

function App() {
    
  function makeToast() {
    Toast.show({
        text: 'Hello!',
    });
  }
    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={makeToast}>
            Start Scanning
        </button>
      </header>
    </div>
  );
}

export default App;
