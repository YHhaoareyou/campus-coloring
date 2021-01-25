import React from "react";
import Nft from "./Nft";
import hiroMarker from "./img/hiro-marker.png";
import "firebase/database";
import "firebase/storage";

class Scene extends React.Component {
  state = {
    isImgLoaded: false,
    locationNames: []
  };

  async componentDidMount() {
    const { db } = this.props;
    const locationsSnap = await db.ref().once('value');
    const locationNames = Object.keys(locationsSnap.val());
    this.setState({ locationNames });

    if (!window.AFRAME.components.markerhandler) {
      window.AFRAME.registerComponent("markerhandler", {
        init: function () {
          this.el.sceneEl.addEventListener("markerFound", async (e) => {
            const snap = await db.ref(e.target.dataset.location).once("value")
            
            for (var key in snap.val()) {
              console.log(key)
            }
          });
  
          this.el.sceneEl.addEventListener("markerLost", (e) => {
            
          });
        },
      });
    }
    
    console.log(window.AFRAME.components.markerhandler);
    
    setTimeout(() => this.setState({ isImgLoaded: true }), 15000);
  }

  componentWillUnmount() {
    delete window.AFRAME.components.markerhandler;
  }

  render() {
    const { locationNames } = this.state;
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
        {
          locationNames && locationNames.map((name, i) => <Nft location={name} key={i} />)
        }
        <a-entity camera></a-entity>
      </a-scene>
    );
  }
}

export default Scene;
