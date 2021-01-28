import React from "react";
import { Button, Icon, Label } from "semantic-ui-react";

class LikeButton extends React.Component {
  state = {
    likes: this.props.image.likes || 0,
    isClicked: false,
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.image &&
      this.props.image &&
      prevProps.image !== this.props.image
    ) {
      this.setState({ likes: this.props.image.likes || 0, isClicked: false });
    }
  }

  like = () => {
    const { location, image, db } = this.props;
    db.ref("locations/" + location)
      .child(image.id.toString())
      .child("likes")
      .set(image.likes ? image.likes + 1 : 1);
    this.setState((prevState) => ({
      ...prevState,
      likes: prevState.likes + 1,
      isClicked: true,
    }));
  };

  render() {
    const { likes, isClicked } = this.state;
    return (
      <Button
        color="red"
        style={{ marginTop: "1.5rem", padding: "0.8rem 0.3rem 0.6rem 1rem" }}
        onClick={this.like}
        disabled={isClicked}
      >
        <Icon name="heart" />
        <Label style={{ top: "1rem" }} floating>
          {likes}
        </Label>
      </Button>
    );
  }
}

export default LikeButton;
