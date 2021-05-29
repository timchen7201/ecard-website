import logo from './logo.svg';
import './App.css';
import {  
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Admin from './pages/admin'
import Upload from './pages/upload'
import View from './pages/view'
import Entry from './pages/Entry'
import SenderPage from './pages/SenderPage'
import RecieverPage from './pages/RecieverPage'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Route exact path ="/admin">
              <Admin/>
          </Route>
          <Route exact path="/upload/:orderNumber">
            <Upload/>
          </Route>
          <Route exact path="/entry">
            <Entry/>
          </Route>
          <Route exact path="/view/:password">
              <View/>
          </Route>
          <Route exact path="/sender">
            <SenderPage/>
          </Route>
          <Route exact path="/reciever">
            <RecieverPage/>
          </Route>
        </Route>
      </Switch>
    </Router>
   
  );
}

export default App;
