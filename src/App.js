import { Router } from '@reach/router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Paintings from "./Paintings";
import { useAuth, useUser, login } from './auth';
import Header from './Header';

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
                  <Header location={"666"} />
                  <Router>
                    <Home path="/" />
                    <Paintings path="/:loc" />
                  </Router>
                </div>
              )
              : (
                <div>
                  <button onClick={handleLogin}>ログイン</button>
                </div>
              )
          }
        </div>
      </Auth>
    </div>
  );
}

export default App;
