import React from "react";

const entities = [
  {
    gltfModel:
      "https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf",
    scale: "3 3 3",
    position: "150 100 -100",
    rotation: "-90 0 0",
  },
  {
    gltfModel:
      "https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf",
    scale: "2 2 2",
    position: "100 100 0",
    rotation: "-90 0 0",
  },
];

class Nft extends React.Component {
  constructor(props) {
    super(props);
    this.entityRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(
      () =>
        this.entityRef.current &&
        this.entityRef.current.setAttribute("scale", { x: 5, y: 5, z: 5 }),
      20000
    );
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
        <a-nft
          type="nft"
          url="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/trex-image/trex"
          smooth="true"
          smoothCount="10"
          smoothTolerance=".01"
          smoothThreshold="5"
          id="a-nft"
        >
          {entities.map((e, i) => (
            <a-entity
              key={i}
              gltf-model={e.gltfModel}
              scale={e.scale}
              position={e.position}
              rotation={e.rotation}
            ></a-entity>
          ))}
          <a-entity
            gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
            scale="1 1 1"
            position="200 100 50"
            rotation="-90 0 0"
            ref={this.entityRef}
          ></a-entity>
        </a-nft>
        <a-entity camera></a-entity>
      </a-scene>
    );
  }
}

export default Nft;
