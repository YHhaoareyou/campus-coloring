import { Router } from '@reach/router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Home from './Home';
import Paintings from "./Paintings";
import { useAuth, useUser, login } from './auth';
import Header from './Header';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";

const Auth = ({ children }) => {
  const isLoading = useAuth();

  return isLoading ? <p>Loading...</p> : children;
};

function App() {
  const { t } = useTranslation();
  const user = useUser();

  const handleLogin = () => {
    login().catch((error) => console.error(error));
  };

  useEffect(() => {
    window.addEventListener('popstate', (event) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          console.log("Camera on")
        })
        .catch(err => {
          console.error(err)
        });
    });
  })

  return (
    <div className="App">
      <Auth>
        <div>
          {
            user
              ? (
                <div>
                  <Header />
                  <Router>
                    <Home path="/" />
                    <Paintings path="/:loc" />
                  </Router>
                </div>
              )
              : (
                <div>
                  <Header />
                  <Button style={{ marginTop: '45vh' }} onClick={handleLogin}>{t('App.Sign in with Google')}</Button>
                </div>
              )
          }
        </div>
      </Auth>
    </div>
  );
}

export default App;
