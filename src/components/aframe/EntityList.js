import React from "react";

class EntityList extends React.Component {
  constructor(props) {
    super(props);
    this.entityRef = React.createRef();
  }

  state = {
    isDisplayed: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isDisplayed: true }), 5000);
    setTimeout(
      () =>
        this.entityRef.current &&
        this.entityRef.current.setAttribute("scale", { x: 8, y: 8, z: 8 }),
      10000
    );
  }

  render() {
    return (
      <React.Fragment>
        <a-entity
          gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
          scale="5 5 5"
          position="70 100 -50"
          rotation="-90 0 0"
        ></a-entity>
        {this.state.isDisplayed && (
          <a-entity
            gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
            scale="3 3 3"
            position="130 100 -50"
            rotation="-90 0 0"
            ref={this.entityRef}
          ></a-entity>
        )}
        {/*<a-entity geometry="primitive: sphere; radius: 5000;" material="shader: flat; src: #hiro"></a-entity>*/}
      </React.Fragment>
    );
  }
}

export default EntityList;
