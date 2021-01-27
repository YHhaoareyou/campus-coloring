import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import firebase from "firebase/app";
import { ReactPainter } from "react-painter";
import ImageSwitch from "./ImageSwitch";
import Footer from "./Footer";

const Layout = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const InnerLayout = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Topbar = styled("div")`
  width: 100%;
  text-align: center;
`;

class App extends React.Component {
  state = {
    isCanvasOpen: false,
    currentImg:
      this.props.imagesInfo &&
      this.props.imagesInfo.length &&
      this.props.imagesInfo[0],
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.imagesInfo &&
      prevProps.imagesInfo !== this.props.imagesInfo
    ) {
      if (this.props.imagesInfo.length > 0) {
        this.setState({ currentImg: this.props.imagesInfo[0] });
      } else {
        this.setState({ currentImg: null });
      }
    }
  }

  signIn = () => {
    try {
      this.props.auth.signInWithRedirect(
        new firebase.auth.GoogleAuthProvider()
      );
    } catch (e) {
      alert(e);
    }
  };

  signOut = () => {
    try {
      this.props.auth.signOut();
    } catch (e) {
      alert(e);
    }
  };

  switchToPrevImage = () => {
    const { imagesInfo, setDisplayImageIndex } = this.props;
    const { currentImg } = this.state;
    const prevIndex =
      imagesInfo.indexOf(currentImg) === 0
        ? imagesInfo.length - 1
        : imagesInfo.indexOf(currentImg) - 1;
    this.setState({
      currentImg: imagesInfo[prevIndex],
    });
    setDisplayImageIndex(prevIndex);
  };

  switchToNextImage = () => {
    const { imagesInfo, setDisplayImageIndex } = this.props;
    const { currentImg } = this.state;
    const nextIndex =
      imagesInfo.indexOf(currentImg) + 1 === imagesInfo.length
        ? 0
        : imagesInfo.indexOf(currentImg) + 1;
    this.setState({
      currentImg: imagesInfo[nextIndex],
    });
    setDisplayImageIndex(nextIndex);
  };

  resetCanvas = () => {
    this.setState({ isCanvasOpen: false }, () =>
      this.setState({ isCanvasOpen: true })
    );
  };

  saveCanvas = (blob) => {
    const { db, storage, currentLocation, user } = this.props;
    var imageName;
    do {
      imageName = prompt("Please name your painting");
    } while (!imageName);
    var description = prompt("Please write something about this painting");
    var image = new Image();
    image.src = blob;
    const uploadTimestamp = Date.now();
    storage
      .ref()
      .child("images/" + imageName)
      .put(blob)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((imageUrl) => {
        db.ref("image_urls")
          .child(uploadTimestamp)
          .set(imageUrl)
          .then((snap) => {
            db.ref("locations")
              .child(currentLocation + "/" + uploadTimestamp)
              .set({
                name: imageName,
                description: description,
                timestamp: uploadTimestamp,
                user: user ? user.uid : "",
              })
              .then(function (snap) {
                alert("Uploaded! Refresh the page to see your materpiece!");
              })
              .catch((error) => {
                alert(error);
              });
          });
      });
  };

  render() {
    const { user, currentLocation } = this.props;
    const { isCanvasOpen, currentImg } = this.state;
    return (
      <Layout>
        <InnerLayout>
          <Topbar>
            {user && user !== "loading" && (
              <span>{user.displayName}, welcome! </span>
            )}
            {user ? (
              user === "loading" ? (
                <h2>Loading...</h2>
              ) : (
                <Button onClick={this.signOut}>Sign out</Button>
              )
            ) : (
              <Button onClick={this.signIn}>Sign in</Button>
            )}
          </Topbar>

          {isCanvasOpen && (
            <ReactPainter
              width={window.innerWidth}
              height={window.innerHeight * 0.8}
              onSave={this.saveCanvas}
              render={({ canvas, triggerSave, setColor, setLineWidth }) => {
                return (
                  <div style={{ zIndex: "1000" }}>
                    <h2 style={{ margin: "0px" }}>
                      {currentLocation || "none"}
                    </h2>
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        border: "5px solid #666",
                      }}
                    >
                      {canvas}
                    </div>
                    <div style={{ padding: "1rem", background: "#ccc" }}>
                      <div>
                        Color{" "}
                        <input
                          type="color"
                          onChange={(e) => setColor(e.target.value)}
                          style={{ width: "30%" }}
                        />{" "}
                        Width{" "}
                        <input
                          type="number"
                          placeholder="5"
                          min="1"
                          max="20"
                          onChange={(e) => setLineWidth(e.target.value)}
                          style={{ width: "30%" }}
                        />
                      </div>
                      <div style={{ paddingTop: "1rem" }}>
                        <Button
                          color="red"
                          icon="close"
                          onClick={() => this.setState({ isCanvasOpen: false })}
                        />
                        <Button color="orange" onClick={this.resetCanvas}>
                          Reset
                        </Button>
                        <Button color="green" onClick={triggerSave}>
                          Save!!
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          )}

          {currentImg && !isCanvasOpen && (
            <ImageSwitch
              switchToPrev={this.switchToPrevImage}
              switchToNext={this.switchToNextImage}
            />
          )}

          {currentImg && !isCanvasOpen && (
            <Footer
              image={currentImg}
              openCanvas={() => this.setState({ isCanvasOpen: true })}
            />
          )}
        </InnerLayout>
      </Layout>
    );
  }
}

export default App;
