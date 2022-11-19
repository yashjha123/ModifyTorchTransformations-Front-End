import React from "react";
import { Badge, Button } from "react-bootstrap";

const Output = ({ Conf, ImgURL }) => {
  return (
    <div className="block">
      <a download="image.jpeg" href={`${ImgURL}`}>
        <div className="imgWrapper">
          <img className="canvas" src={ImgURL} />
        </div>
      </a>
      <p style={{ fontSize: `.875rem` }}>Click the image to download!</p>
      {/* <br /> */}
      {Conf ? (
        <>
          <Badge bg="success">{Conf["file_type"]}</Badge>{" "}
          <Badge bg="success">{Conf["file_type_encoded"]}</Badge>
          <Badge bg="info">
            {Conf["is_scaled"] ? "Color Range Scaled" : ""}
          </Badge>
          <Badge bg="info">
            {Conf["is_normalised"] ? "Color Range Normalised" : ""}
          </Badge>
          <br />
          <br />
        </>
      ) : (
        ""
      )}
      {ImgURL ? (
        <a download="image.jpeg" href={`${ImgURL}`}>
          <Button size="sm" variant="outline-dark">
            Download
          </Button>
        </a>
      ) : (
        ""
      )}
    </div>
  );
};

export default Output;
