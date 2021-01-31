import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import styled from "styled-components";
import firebase from "firebase/app";
import ImageSwitch from "./ImageSwitch";
import Footer from "./Footer";
import Canvas from "./Canvas";

const Layout = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90%;
`;

const InnerLayout = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
`;

class App extends React.Component {
  state = {
    isCanvasOpen: false,
    isEditMode: false,
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

  render() {
    const { currentLocation, db, storage, imgUrls } = this.props;
    const { isCanvasOpen, currentImg, isEditMode } = this.state;
    return (
      <Layout>
        <InnerLayout>
          {isCanvasOpen && (
            <Canvas
              location={currentLocation}
              bkImg={
                "https://firebasestorage.googleapis.com/v0/b/campus-coloring.appspot.com/o/images%2FFSE?alt=media&token=b71ce295-ff89-4623-9fe2-25feb18faca6"
              }
              isEditMode={isEditMode}
              db={db}
              storage={storage}
              resetCanvas={this.resetCanvas}
              closeCanvas={() =>
                this.setState({ isCanvasOpen: false, isEditMode: false })
              }
            />
          )}

          {currentImg && !isCanvasOpen && (
            <ImageSwitch
              switchToPrev={this.switchToPrevImage}
              switchToNext={this.switchToNextImage}
            />
          )}

          {currentLocation && !isCanvasOpen && (
            <Footer
              location={currentLocation}
              image={currentImg}
              openCanvas={() =>
                this.setState({ isCanvasOpen: true, isEditMode: false })
              }
              openCanvasWithImg={() =>
                this.setState({ isCanvasOpen: true, isEditMode: true })
              }
              db={db}
            />
          )}
        </InnerLayout>
      </Layout>
    );
  }
}

export default App;
