import React from "react";
import Nft from "./Nft";
import hiroMarker from "./img/hiro-marker.png";
import "firebase/database";
import "firebase/storage";

class Scene extends React.Component {
  state = {
    isImgLoaded: true,
    locationNames: [],
    currentLocation: "",
    currentImages: [],
  };

  async componentDidMount() {
    const { db } = this.props;
    const locationsSnap = await db.ref().once("value");
    const locationData = locationsSnap.val();
    console.log(locationData);
    this.setState({ locationNames: Object.keys(locationData) });

    const setImages = (images) => {
      this.setState({ currentImages: images }, () =>
        console.log(this.state.currentImages)
      );
    };
    const setLocation = (loc) => this.setState({ currentLocation: loc });

    if (!window.AFRAME.components.markerhandler) {
      window.AFRAME.registerComponent("markerhandler", {
        init: function () {
          this.el.sceneEl.addEventListener("markerFound", (e) => {
            const currentLocation = e.target.dataset.location;
            setLocation(currentLocation);
            db.ref(currentLocation).once("value", (snap) => {
              var currentImages = [];
              const images = snap.val();
              for (var id in images) {
                console.log(id);
                currentImages.push({ ...images[id], id: id });
              }
              setImages(currentImages);
            });
          });

          this.el.sceneEl.addEventListener("markerLost", (e) => setImages([]));
        },
      });
    }

    // setTimeout(() => this.setState({ isImgLoaded: true }), 5000);
  }

  componentWillUnmount() {
    delete window.AFRAME.components.markerhandler;
  }

  render() {
    const {
      isImgLoaded,
      locationNames,
      currentLocation,
      currentImages,
    } = this.state;
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
          locationNames.map((name, i) => (
            <Nft
              location={name}
              images={
                currentLocation === name && currentImages.length > 0
                  ? currentImages
                  : []
              }
              key={i}
            />
          ))}
        <a-nft
          markerhandler
          type="nft"
          url="trex1/trex1"
          smooth="true"
          smoothCount="10"
          smoothTolerance=".01"
          smoothThreshold="5"
          id="a-nft"
          data-location="trex1"
        >
          <a-image
            src="#hiroMarker"
            width="300"
            height="300"
            position="300 1 0"
            rotation="-90 0 0"
          ></a-image>
        </a-nft>
        <a-entity camera></a-entity>
      </a-scene>
    );
  }
}

export default Scene;
