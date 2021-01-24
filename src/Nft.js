import React from "react";
import Entity from "./Entity";

class Nft extends React.Component {
  render() {
    return (
      <a-nft
        type="nft"
        url="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/trex-image/trex"
        smooth="true"
        smoothCount="10"
        smoothTolerance=".01"
        smoothThreshold="5"
        id="a-nft"
      >
        <Entity />
      </a-nft>
    );
  }
}

export default Nft;
