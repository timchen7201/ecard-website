import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../appContext";
import { emailSignIn } from "../api/admin";
import webSocket from "socket.io-client";
import Header from "../components/Header";
import BrandIntro from "../components/BrandIntro";

export default function Login(prop) {
  const { authDispatch } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loggingStatus, setLoggingStatus] = useState(true);
  // const [ws,setWs] = useState(null)

  // const connectWebSocket = () => {
  //     //開啟
  //     setWs(webSocket('http://localhost:4000'))
  // }
  // useEffect(() => {
  //   connectWebSocket()

  //   return () => {

  //   }
  // }, [])
  // useEffect(()=>{
  //     if(ws){
  //         //連線成功在 console 中打印訊息
  //         console.log('success connect!')
  //         //設定監聽
  //         initWebSocket()
  //     }
  // },[ws])

  // const initWebSocket = () => {
  //     //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
  //     ws.on('getMessage', message => {
  //         console.log(message)
  //     })
  // }

  // const sendMessage = () => {
  //     //以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
  //     ws.emit('getMessage', '只回傳給發送訊息的 client')
  // }

  const defaultSignIn = async () => {
    try {
      const { access_token } = await emailSignIn({
        username,
        password,
      });
      authDispatch({
        type: "LOGIN",
        user: username,
        accessToken: access_token,
      });
      console.log(access_token);
    } catch (error) {
      setLoggingStatus(false);
      console.error(error);
    }
  };
  return (
    <main id="content" role="main" className="main">
      <Header menu={null}></Header>

      <div className="container py-5 py-sm-7 lg-div">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card card-lg mb-5">
              <div className="card-body">
                <div className="text-center"></div>
                <div className="js-form-message form-group">
                  <label className="input-label">Account Name</label>

                  <input
                    default-value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    type="email"
                    className="form-control"
                    name="email"
                    id="signinSrEmail"
                    aria-label="email@address.com"
                    required
                    data-msg="Please enter a valid email address."
                  />
                </div>
                <div className="js-form-message form-group">
                  <label className="input-label">
                    <span className="d-flex justify-content-between align-items-center">
                      Password
                    </span>
                  </label>

                  <div className="input-group input-group-merge">
                    <input
                      default-value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      className="js-toggle-password form-control"
                      name="password"
                      id="signupSrPassword"
                      aria-label="8+ characters required"
                      required
                      data-msg="Your password is invalid. Please try again."
                      data-hs-toggle-password-options='{
                               "target": "#changePassTarget",
                               "defaultClass": "tio-hidden-outlined",
                               "showClass": "tio-visible-outlined",
                               "classChangeTarget": "#changePassIcon"
                             }'
                    />
                    <div id="changePassTarget" className="input-group-append">
                      <a className="input-group-text">
                        <i
                          id="changePassIcon"
                          className="tio-visible-outlined"
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="termsCheckbox"
                      name="termsCheckbox"
                    />
                  </div>
                </div>

                {loggingStatus ? (
                  <div></div>
                ) : (
                  <div className="text-center">
                    <sapn id="name" class="text-danger">
                      Incorrect account name or password
                    </sapn>
                  </div>
                )}
                <button
                  onClick={defaultSignIn}
                  className="btn btn-block btn-primary"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BrandIntro></BrandIntro>
    </main>
  );
}
