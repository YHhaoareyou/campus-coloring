import React from "react";
import Nft from "./Nft";

class Scene extends React.Component {
  render() {
    return (
      <a-scene
        id="a-scene"
        vr-mode-ui="enabled: false;"
        renderer="logarithmicDepthBuffer: true;"
        embedded
        arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
      >
        <Nft />
        <a-entity camera></a-entity>
      </a-scene>
    );
  }
}

export default Scene;
