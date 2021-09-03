import { ReactPainter } from "react-painter";

const Canvas = () => {
  const saveCanvas = (blob) => {

  }

  return (
    <ReactPainter
      width={300}
      height={500}
      onSave={saveCanvas}
      render={({ canvas, triggerSave, setColor, setLineWidth }) => {
        return (
          <div style={{ zIndex: "1000" }}>
            <h2 style={{ margin: "0px" }}>{/* location */}</h2>
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
                { /* Buttons */ }
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default Canvas;