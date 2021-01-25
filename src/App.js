import "./App.css";
import styled from "styled-components";

const Layout = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 5em;
`;

function App({ isCanvasOpen }) {
  return <Layout>
    {isCanvasOpen && <canvas style={{background: "#fff"}}>ゆびゆび！</canvas>}
  </Layout>;
}

export default App;
