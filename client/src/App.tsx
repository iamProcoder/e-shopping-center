import { IconContext } from 'react-icons';
import './App.css';
import Router from './components/Router';


function App() {
  return (
    <div className="App ml-5 mr-5">
      <IconContext.Provider value={{ style: { float:'left', marginRight:'5px', verticalAlign: 'middle' } }}>
        <Router />
      </IconContext.Provider>
    </div>
  );
}

export default App;
