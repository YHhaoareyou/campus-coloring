import { Router } from '@reach/router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Home from './Home';
import Paintings from "./Paintings";
import { useAuth, useUser, login } from './auth';
import Header from './Header';
import { Button } from 'react-bootstrap';

const Auth = ({ children }) => {
  const isLoading = useAuth();

  return isLoading ? <p>Loading...</p> : children;
};

function App() {
  const user = useUser();

  const handleLogin = () => {
    login().catch((error) => console.error(error));
  };

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
                  <Button style={{ marginTop: '45vh' }} onClick={handleLogin}>Googleアカウントでログイン</Button>
                </div>
              )
          }
        </div>
      </Auth>
    </div>
  );
}

export default App;
