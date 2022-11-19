import { faUpload, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios";
// import {  } from 'bootstrap';
import imgs from "../imgs.json";

import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
const Upload = ({
  setAlertText,
  Trans,
  setTrans,
  setUUID,
  setSubmitDisabled,
}) => {
  const [File, setFile] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");
  const [Type, setType] = useState(-1);
  const fr = new FileReader();
  // const onLoad = (e) => {
  // setPreviewSrc(fr.result)
  // }
  useEffect(() => {
    if (!File) {
      setPreviewSrc(undefined);
      return;
    }
    setSubmitDisabled(true);

    const objectUrl = URL.createObjectURL(File);
    setPreviewSrc(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [File]);
  const onChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
      return;
    }
    setFile(e.target.files[0]);
    // const objectUrl = URL.createObjectURL(File);
    // setPreviewSrc(objectUrl)
    // Preview Image before upload
    // onSubmit(e);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!File) {
      // alert("Please upload file!");
      setAlertText("Upload file first!");
      return;
    }

    // alert("hello")

    // console.log(fr.result)
    // setPreviewSrc(fr.result)
    // setPreviewSrc(fr.readAsDataURL(File));
    // Uploading data to the server
    const formData = new FormData();
    console.log(File);
    formData.append("file", File);
    formData.append("filename", File.name);
    // formData.append("content123", "{'hello':'txt'}");
    formData.append("user", "{'hello':'txt'}");
    console.log(File.name);
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "multipart/form-data"
      },
    };
    // axios.post("http://localhost:5000/fileUpload", formData,config)
    // .then((res)=>console.log(res));
    fetch("http://localhost:5000/fileUpload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((body) => {
        setSubmitDisabled(false);
        setUUID(body.id);
      });
  };
  useEffect(() => {
    if (Type != "-1") {
      console.log(Type);
      const filePath = imgs.value[parseInt(Type) - 1].file;
      setUUID(Type);
      setSubmitDisabled(false);
      setPreviewSrc("http://localhost:5000/file/" + filePath);
    } else {
      setSubmitDisabled(true);
      setPreviewSrc("");
      setUUID("");
    }
  }, [Type]);
  return (
    <div className="block">
      <InputGroup>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="-1">Open this select menu</option>
          {imgs.value.map((value) => (
            <option key={value.index} value={value.index}>
              {value.name}
            </option>
          ))}
        </Form.Select>
      </InputGroup>
      <div className="imgWrapper">
        <img src={previewSrc} className="canvas" />
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Label column="sm">Upload file to begin!</Form.Label>

        <InputGroup>
          <Form.Control onChange={onChange} type="file" />
          <Button type="submit" onSubmit={onSubmit}>
            Upload {"   "}
            <FontAwesomeIcon icon={faFileUpload} />
          </Button>
          {/* <input onChange={(e)=>setFile(e.target.value)} type="text"></input>
          <input onChange={onChange} name="InputImage" type="file" />
          
          <input type="submit" onSubmit={onSubmit}/> */}
        </InputGroup>
      </Form>
      {/* <form onSubmit={onSubmit}>
        <input onChange={(e)=>setFile(e.target.value)} type="text"></input> 
        <input onChange={onChange} name="InputImage" type="file" />
        <input type="submit" onSubmit={onSubmit}/>
      </form> */}
    </div>
  );
};

export default Upload;
