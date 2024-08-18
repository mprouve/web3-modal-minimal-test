import useWeb3ModalContext from "./hooks/useWeb3ModalContext";
import "./App.css";

function App() {
  const { connectViaWeb3Modal } = useWeb3ModalContext();

  return (
    <div className="App">
      <header className="App-header">
        <w3m-connect-button />
        <button onClick={connectViaWeb3Modal} style={{ marginTop: "1rem" }}>
          Call open()
        </button>
      </header>
    </div>
  );
}

export default App;
