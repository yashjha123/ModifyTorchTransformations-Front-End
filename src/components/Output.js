import React from "react";
import { Badge } from "react-bootstrap";

const Output = ({ Conf, ImgURL }) => {
  return (
    <div className="block">
      <div className="imgWrapper">
        <img className="canvas" src={ImgURL} />
      </div>
      <div>
        <Badge pill bg="primary">
          Primary
        </Badge>{" "}
      </div>
      {Conf}
    </div>
  );
};

export default Output;
