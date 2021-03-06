import { Button } from "semantic-ui-react";
import { ReactPainter } from "react-painter";

const Canvas = ({ db, storage, location, bkImg, resetCanvas, closeCanvas }) => {
  console.log(bkImg);
  console.log(bkImg);
  console.log(bkImg);
  const saveCanvas = (blob) => {
    var imageName, description, username, isPublic;
    do {
      username = prompt("What's your name? Any nickname is fine!");
    } while (!username);
    do {
      imageName = prompt("Please name your painting:");
    } while (!imageName);
    description = prompt("Please write something about this painting:");
    isPublic = window.confirm(
      "Do you allow other users create paintings basing on this one?"
    );
    var image = new Image();
    image.src = blob;
    const uploadTimestamp = Date.now();
    storage
      .ref()
      .child("images/" + imageName)
      .put(blob)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((imageUrl) => {
        db.ref("image_urls")
          .child(uploadTimestamp)
          .set(imageUrl)
          .then((snap) => {
            db.ref("locations")
              .child(location + "/" + uploadTimestamp)
              .set({
                name: imageName,
                description: description,
                timestamp: uploadTimestamp,
                user: username,
                is_public: isPublic,
              })
              .then(function (snap) {
                alert("Uploaded! Refresh the page to see your materpiece!");
                closeCanvas();
              })
              .catch((error) => {
                alert(error);
              });
          });
      });
  };

  return (
    <ReactPainter
      width={300}
      height={500}
      onSave={saveCanvas}
      image={bkImg}
      render={({ canvas, triggerSave, setColor, setLineWidth }) => {
        return (
          <div style={{ zIndex: "1000" }}>
            <h2 style={{ margin: "0px" }}>{location || "none"}</h2>
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                border: "5px solid #666",
              }}
            >
              {canvas}
            </div>
            <div style={{ padding: "1rem", background: "#ccc" }}>
              <div>
                Color{" "}
                <input
                  type="color"
                  onChange={(e) => setColor(e.target.value)}
                  style={{ width: "30%" }}
                />{" "}
                Width{" "}
                <input
                  type="number"
                  placeholder="5"
                  min="1"
                  max="20"
                  onChange={(e) => setLineWidth(e.target.value)}
                  style={{ width: "30%" }}
                />
              </div>
              <div style={{ paddingTop: "1rem" }}>
                <Button color="red" icon="close" onClick={closeCanvas} />
                <Button color="orange" onClick={resetCanvas}>
                  Reset
                </Button>
                <Button color="green" onClick={triggerSave}>
                  Save!!
                </Button>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default Canvas;
