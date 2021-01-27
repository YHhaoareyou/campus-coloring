import React from "react";

class Nft extends React.Component {
  constructor(props) {
    super(props);
    this.entityRef = React.createRef();
  }

  componentDidMount() {
    // setTimeout(
    //   () =>
    //     this.entityRef.current &&
    //     this.entityRef.current.setAttribute("scale", { x: 2, y: 2, z: 2 }),
    //   15000
    // );
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
        {this.props.images.map((img) => (
          <a-image
            src={"#" + img.id}
            width="500"
            height="500"
            position="150 0 0"
            rotation="-90 0 0"
          ></a-image>
        ))}
      </a-nft>
    );
  }
}

export default Nft;
