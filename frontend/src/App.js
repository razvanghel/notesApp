import {
  HashRouter as Router,
} from "react-router-dom";
import './App.css';
import MainPage from './pages/MainPage.js'

function App() {
  return (
    <Router>

      <div className="App">
        <MainPage>

        </MainPage>

      </div>
    </Router>
  );
}

export default App;