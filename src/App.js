import logo from './img/logo.png';
import './styles/App.css';
import GetMealIdea from './hooks/GetMealIdea'

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt='logo'/>
        <h3 className='subtitle'>YUMM! What are we going to eat today?</h3>
        
        <GetMealIdea />
      </header>
    </div>
  );
}

export default App;
