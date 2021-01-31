import React from "react";
import Nft from "./Nft";
import hiroMarker from "./img/hiro-marker.png";
import "firebase/database";
import "firebase/storage";

class Scene extends React.Component {
  state = {
    locationNames: [],
    currentLocation: null,
    currentImages: [],
    imageUrlsById: {},
  };

  async componentDidMount() {
    const { db, dbData } = this.props;
    const imageUrlsById = dbData.image_urls;
    let locationData = dbData.locations;
    this.setState({
      imageUrlsById: imageUrlsById,
      locationNames: Object.keys(locationData),
    });

    const setImages = (images) => {
      this.setState({ currentImages: images });
      this.props.setImagesInfo(images);
    };
    const setLocation = (loc) => {
      this.setState({ currentLocation: loc });
      this.props.setLocation(loc);
    };

    window.AFRAME.registerComponent("markerhandler", {
      init: function () {
        this.el.sceneEl.addEventListener("markerFound", (e) => {
          const currentLocation = e.target.dataset.location;
          setLocation(currentLocation);
          db.ref("locations")
            .child(currentLocation)
            .once("value", (snap) => {
              var currentImages = [];
              const images = snap.val();
              for (var id in images) {
                currentImages.push({ ...images[id], id: id });
              }
              setImages(currentImages);
            });
        });

        this.el.sceneEl.addEventListener("markerLost", (e) => {
          setLocation(null);
          setImages([]);
        });
      },
    });
  }

  componentWillUnmount() {
    delete window.AFRAME.components.markerhandler;
  }

  render() {
    const {
      locationNames,
      currentLocation,
      currentImages,
      imageUrlsById,
    } = this.state;
    const isImagesLoaded = Object.keys(imageUrlsById).length > 0;
    const isLocationsLoaded = locationNames.length > 0;
    return (
      <a-scene
        id="a-scene"
        vr-mode-ui="enabled: false;"
        renderer="logarithmicDepthBuffer: true;"
        embedded
        arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
      >
        {isImagesLoaded && (
          <a-assets>
            <img id="hiroMarker" src={hiroMarker} alt="hiroMarker" />
            {Object.keys(imageUrlsById).map((id) => (
              <img
                key={id}
                id={id}
                src={imageUrlsById[id]}
                alt={id}
                crossOrigin="anonymous"
              />
            ))}
          </a-assets>
        )}
        {isImagesLoaded &&
          isLocationsLoaded &&
          locationNames.map((name) => (
            <Nft
              key={name}
              location={name}
              images={
                currentLocation === name && currentImages.length > 0
                  ? currentImages
                  : []
              }
              displayImageIndex={this.props.displayImageIndex}
            />
          ))}
        <a-entity camera></a-entity>
      </a-scene>
    );
  }
}

export default Scene;
