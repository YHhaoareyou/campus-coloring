import React from "react";
import Nft from "./Nft";
import hiroMarker from "./img/hiro-marker.png";

class Scene extends React.Component {
  state = {
    isImgLoaded: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isImgLoaded: true }), 15000);
  }

  render() {
    return (
      <a-scene
        id="a-scene"
        vr-mode-ui="enabled: false;"
        renderer="logarithmicDepthBuffer: true;"
        embedded
        arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
      >
        <a-assets>
          {this.state.isImgLoaded && (
            <img id="hiroMarker" src={hiroMarker} alt="hiroMarker" />
          )}
        </a-assets>
        <Nft />
        <a-entity camera></a-entity>
      </a-scene>
    );
  }
}

export default Scene;
