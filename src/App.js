import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import firebase from "firebase/app";

const Layout = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Topbar = styled("div")`
  width: 100%;
  text-align: center;
`;

function App({ isCanvasOpen, auth, user }) {
  const signIn = () => {
    try {
      auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    } catch (e) {
      alert(e)
    }
  }

  const signOut = () => {
    try {
      auth.signOut()
    } catch (e) {
      alert(e)
    }
  }

  return <Layout>
    <Topbar>
      {
        user && user !== "loading" && <span>{user.displayName}, welcome! </span>
      }
      {
        user ? (user === "loading" ? <h2>Loading...</h2> : <Button onClick={signOut}>Sign out</Button>) : <Button onClick={signIn}>Sign in</Button>
      }
    </Topbar>
    
    {isCanvasOpen && <canvas style={{background: "#fff"}}>ゆびゆび！</canvas>}
  </Layout>;
}

export default App;
