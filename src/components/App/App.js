import './App.css';
import firebaseConnection from '../../helpers/data/connection';
import TopBar from '../TopBar/TopBar';
import CurrentDataDisplay from '../CurrentDataDisplay/CurrentDataDisplay';

firebaseConnection();

function App() {
  return (
    <div className="App">
      <TopBar />
      <CurrentDataDisplay />
    </div>
  );
}

export default App;
