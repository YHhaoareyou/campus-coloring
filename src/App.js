import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Segment, Icon, Label } from "semantic-ui-react";
import styled from "styled-components";
import firebase from "firebase/app";

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

const ImageSwitch = styled(Grid)`
  position: absolute;
  left: 0;
  top: 45%;
  width: 100%;
  height: 5%;
`;

const Footer = styled(Grid)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 15%;
`;

class App extends React.Component {
  state = {
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

  render() {
    const { isCanvasOpen, imagesInfo, user } = this.props;
    const { currentImg } = this.state;
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
            <canvas style={{ background: "#fff" }}>ゆびゆび！</canvas>
          )}

          {currentImg && (
            <ImageSwitch>
              <Grid.Column width={1}>
                <Button
                  onClick={() =>
                    this.setState({
                      currentImg:
                        imagesInfo.indexOf(currentImg) === 0
                          ? imagesInfo[imagesInfo.length - 1]
                          : imagesInfo[imagesInfo.indexOf(currentImg) - 1],
                    })
                  }
                >
                  <Icon name="angle left" />
                </Button>
              </Grid.Column>
              <Grid.Column width={14}></Grid.Column>
              <Grid.Column width={1}>
                <Button
                  onClick={() =>
                    this.setState({
                      currentImg:
                        imagesInfo.indexOf(currentImg) + 1 === imagesInfo.length
                          ? imagesInfo[0]
                          : imagesInfo[imagesInfo.indexOf(currentImg) + 1],
                    })
                  }
                >
                  <Icon name="angle right" />
                </Button>
              </Grid.Column>
            </ImageSwitch>
          )}

          {currentImg && (
            <Footer>
              <Grid.Column width={8}>
                <Segment>
                  <h4>{currentImg.name}</h4>
                  <p>{currentImg.description}</p>
                </Segment>
              </Grid.Column>
              <Grid.Column width={2}>
                <Button as="div" labelPosition="right">
                  <Button color="red">
                    <Icon name="heart" />
                  </Button>
                  <Label as="a" basic color="red" pointing="left">
                    1
                  </Label>
                </Button>
              </Grid.Column>
              <Grid.Column width={3}>
                <Button color="orange">Add your painting on this one</Button>
              </Grid.Column>
              <Grid.Column width={3}>
                <Button color="green">Create your new painting</Button>
              </Grid.Column>
            </Footer>
          )}
        </InnerLayout>
      </Layout>
    );
  }
}

export default App;
