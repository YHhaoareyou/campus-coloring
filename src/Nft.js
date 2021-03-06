import React from "react";

class Nft extends React.Component {
  constructor(props) {
    super(props);
    this.entityRef = React.createRef();
  }

  render() {
    return (
      <a-nft
        markerhandler
        type="nft"
        url={
          "https://yhhaoareyou.github.io/campus-coloring/descriptors/" +
          this.props.location
        }
        smooth="true"
        smoothCount="10"
        smoothTolerance=".01"
        smoothThreshold="5"
        id="a-nft"
        data-location={this.props.location}
      >
        {this.props.images.map((img, i) => (
          <a-image
            src={"#" + img.id}
            width={i === this.props.displayImageIndex ? 375 * 0.5 : 0}
            height={i === this.props.displayImageIndex ? 500 * 0.5 : 0}
            position="35 0 0"
            rotation="-90 0 0"
            key={img.id}
          ></a-image>
        ))}
      </a-nft>
    );
  }
}

export default Nft;
