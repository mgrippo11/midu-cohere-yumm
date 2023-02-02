import logo from './logo.png';
import './App.css';
import GetMealIdea from './hooks/GetMealIdea'

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt='logo'/>
        <h5>What are we going to eat today?</h5>
        
        <GetMealIdea />

      </header>
    </div>
  );
}

export default App;
