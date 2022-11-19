import { faClose, faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Badge, Button } from "react-bootstrap";

const Output = ({ setConf, Conf, setImgURL, ImgURL }) => {
  return (
    <div className="block">
      <Button
        onClick={(e) => {setConf("");setImgURL("")}}
        variant="outline-danger"
        style={{
          // float: "left",
          borderBottom: "0px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <FontAwesomeIcon icon={faClose} />
      </Button>
      <br />
      <div className="imgWrapper">
        <a download="image.jpeg" href={`${ImgURL}`}>
          <img className="canvas" src={ImgURL} />
        </a>  
      </div>
      <p style={{ fontSize: `.875rem` }}>Click the image to download!</p>
      {/* <br /> */}
      {Conf ? (
        <>
          <Badge bg="success">{Conf["file_type"]}</Badge>{" "}
          <Badge bg="success">{Conf["file_type_encoded"]}</Badge>{" "}
          <Badge bg="info">
            {Conf["is_scaled"] ? "Color Range Scaled" : ""}
          </Badge>{" "}
          <Badge bg="info">
            {Conf["is_normalised"] ? "Color Range Normalised" : ""}
          </Badge>{" "}
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
