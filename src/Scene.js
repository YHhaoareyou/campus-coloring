import React from "react";

class Scene extends React.Component {
  state = {

  }

  async componentDidMount() {
    
  }

  render () {
    return (
      <a-scene>
        <a-assets></a-assets>
        <a-entity camera></a-entity>
      </a-scene>
    )
  }
}

export default Scene;