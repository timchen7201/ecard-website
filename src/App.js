import logo from "./logo.svg";
import "./App.css";
import { useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./pages/Admin";
import Upload from "./pages/upload";
import View from "./pages/view";
import Entry from "./pages/Entry";
import SenderPage from "./pages/SenderPage";
import ReceiverPage from "./pages/ReceiverPage";
import PreviewPage from "./pages/PreviewPage";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import request from "./utils/request";
import storage from "./utils/storage";
import { AuthContext } from "./appContext";
import { fetchAdmin } from "./api/admin";
import { useCookies } from "react-cookie";
import { LangContext } from "./wording";

function App() {
  const [cookies, setCookie] = useCookies(["lang"]);
  const [lang, setLang] = useState("jp");
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
    }
  );

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
    };
    bootstrapAsync();
  }, []);

  useEffect(() => {
    // Set language
    if (!cookies.lang) {
      var userLang = navigator.language || navigator.userLanguage;
      if (userLang) {
        userLang = userLang.toLowerCase();
        if (userLang.startsWith("zh")) {
          userLang = "zh-tw";
        } else {
          userLang = "jp";
        }
        setCookie("lang", userLang, { path: "/" });
        setLang(userLang);
      } else {
        setCookie("lang", "jp", { path: "/" });
        setLang("jp");
      }
    } else {
      setLang(cookies.lang);
    }
  });
  useEffect(() => {}, [lang]);

  function changeLang(lang) {
    setCookie("lang", lang, { path: "/" });
    setLang(lang);
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      <LangContext.Provider
        value={{
          lang: lang,
          changeLang: changeLang,
        }}
      >
        <Router>
          <Switch>
            <Route path="/">
              <Route exact path="/">
                {authState.user ? <Admin lang={lang} /> : <Login lang={lang} />}
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
                <SenderPage lang={lang} />
              </Route>
              <Route exact path="/receiver/:item">
                <ReceiverPage lang={lang} />
              </Route>
              <Route exact path="/preview/:orderNumber">
                <PreviewPage lang={lang} />
              </Route>
            </Route>
          </Switch>
        </Router>
      </LangContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
