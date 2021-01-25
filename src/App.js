import "./App.css";
import styled from "styled-components";
import firebase from "firebase/app";

const Layout = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 5em;
`;

function App({ isCanvasOpen, auth }) {
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
    {isCanvasOpen && <canvas style={{background: "#fff"}}>ゆびゆび！</canvas>}
    <button onClick={signIn}>Sign in</button>
    <button onClick={signOut}>Sign out</button>
  </Layout>;
}

export default App;
