import React from "react";
import { Badge, Button } from "react-bootstrap";

const Output = ({ Conf, ImgURL }) => {
  return (
    <div className="block">
      <div className="imgWrapper">
        <img className="canvas" src={ImgURL} />
      </div>
      <br />
      {ImgURL ? (
        <a download="image.jpeg" href={`${ImgURL}`}>
          <Button size="sm" variant="outline-dark">Download</Button>
        </a>
      ) : (
        ""
      )}
      {/* {console.log(conf)} */}
      {/* {JSON.stringify(Conf)}
      {Conf.file_type_encoded} */}
      <Badge bg="success">{Conf["file_type"]}</Badge>{" "}
      <Badge bg="success">{Conf["file_type_encoded"]}</Badge>
      <Badge bg="info">{Conf["is_scaled"] ? "Color Range Scaled" : ""}</Badge>
      <Badge bg="info">
        {Conf["is_normalised"] ? "Color Range Normalised" : ""}
      </Badge>
    </div>
  );
};

export default Output;
