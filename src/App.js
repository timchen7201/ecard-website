import logo from "./logo.svg";
import "./App.css";
import {useReducer,useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./pages/Admin";
import Upload from "./pages/upload";
import View from "./pages/view";
import Entry from "./pages/Entry";
import SenderPage from "./pages/SenderPage";
import ReceiverPage from "./pages/ReceiverPage";
import PreviewPage from "./pages/PreviewPage";
import Login from "./pages/Login"
import "bootstrap/dist/css/bootstrap.min.css";
import request from "./utils/request";
import storage from "./utils/storage";
import { AuthContext } from "./appContext";
import {fetchAdmin} from './api/admin'


function App() {
  // Auth
  const [authState, authDispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE":
          request.defaults.headers.common.Authorization = `Bearer ${action.accessToken}`;
          storage.setAccessToken(action.accessToken);
          return {
            ...prevState,
            user: action.user,
            accessToken: action.accessToken,
          };
        case "LOGIN":
          request.defaults.headers.common.Authorization = `Bearer ${action.accessToken}`;
          storage.setAccessToken(action.accessToken);
          return {
            ...prevState,
            user: action.user,
            accessToken: action.accessToken,
          };
        case "LOGOUT":
          request.defaults.headers.common.Authorization = ``;
          storage.clear();
          return {
            ...prevState,
            user: null,
            accessToken: null,
          };
        default:
          return {
            ...prevState,
          };
      }
    },
    {
      user: null,
      accessToken: null,
    });

    // Setup
  useEffect(() => {
    const bootstrapAsync = async () => {
      // Auth
      const accessToken = storage.getAccessToken();
      if (accessToken) {
        // Set the token globally
        request.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        // Validate token
        try {
          const user = await fetchAdmin();
          authDispatch({
            type: "RESTORE",
            user: user.name,
            accessToken: accessToken,
          });
        } catch (error) {
          console.error("Invalid token");
        }
      }
    }
    bootstrapAsync();

  },[])
 
  return (
    <AuthContext.Provider
    value={{
      authState,
      authDispatch,
    }}
  >
    <Router>
      <Switch>
        <Route path="/">
          <Route exact path="/">
            {authState.user ? <Admin /> : <Login />}
          </Route>
         
          <Route exact path="/upload/:orderNumber">
            <Upload />
          </Route>
          <Route exact path="/entry">
            <Entry />
          </Route>
          <Route exact path="/view/:password">
            <View />
          </Route>
          <Route exact path="/sender/:orderNumber">
            <SenderPage />
          </Route>
          <Route exact path="/receiver/:item">
            <ReceiverPage />
          </Route>
          <Route exact path="/preview/:orderNumber">
            <PreviewPage />
          </Route>
        </Route>
      </Switch>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
