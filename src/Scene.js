import React from "react";
import Nft from "./Nft";
import hiroMarker from "./img/hiro-marker.png";
import "firebase/database";
import "firebase/storage";

class Scene extends React.Component {
  state = {
    isImgLoaded: false,
    locationNames: [],
    currentImages: [],
  };

  async componentDidMount() {
    const { db } = this.props;
    const locationsSnap = await db.ref().once("value");
    const locationData = locationsSnap.val();
    console.log(locationData);
    this.setState({ locationNames: Object.keys(locationData) });

    const setImages = (images) => {
      this.setState({ currentImages: images });
    };

    if (!window.AFRAME.components.markerhandler) {
      window.AFRAME.registerComponent("markerhandler", {
        init: function () {
          this.el.sceneEl.addEventListener("markerFound", (e) => {
            db.ref(e.target.dataset.location).once("value", (snap) => {
              var currentImages = [];
              const images = snap.val();
              for (var id in images) {
                currentImages.push({ ...images[id], id: id });
              }
              setImages(currentImages);
            });
          });

          this.el.sceneEl.addEventListener("markerLost", (e) => setImages([]));
        },
      });
    }

    setTimeout(() => this.setState({ isImgLoaded: true }), 5000);
  }

  componentWillUnmount() {
    delete window.AFRAME.components.markerhandler;
  }

  render() {
    const { isImgLoaded, locationNames, currentImages } = this.state;
    return (
      <a-scene
        id="a-scene"
        vr-mode-ui="enabled: false;"
        renderer="logarithmicDepthBuffer: true;"
        embedded
        arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
      >
        <a-assets>
          {isImgLoaded && (
            <img id="hiroMarker" src={hiroMarker} alt="hiroMarker" />
          )}
          {currentImages &&
            currentImages.map((img) => (
              <img key={img.id} id={img.id} src={img.url} alt={img.name} />
            ))}
        </a-assets>
        {locationNames &&
          locationNames.map((name, i) => <Nft location={name} key={i} />)}
        <a-entity camera></a-entity>
      </a-scene>
    );
  }
}

export default Scene;
