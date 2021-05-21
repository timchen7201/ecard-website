import logo from './logo.svg';
import './App.css';
import {  
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Upload from './pages/upload'
import View from './pages/view'
import Entry from './pages/Entry'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Route exact path="/upload/:orderNumber">
            <Upload/>
          </Route>
          <Route exact path="/entry">
            <Entry/>
          </Route>
          <Route exact path="/view/:password">
              <View/>
          </Route>
        </Route>
      </Switch>
    </Router>
   
  );
}

export default App;
