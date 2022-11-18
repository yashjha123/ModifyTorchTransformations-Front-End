import axios from "axios";
// import {  } from 'bootstrap';
import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
const Upload = ({ Trans, setTrans, setUUID, setSubmitDisabled }) => {
  const [File, setFile] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");
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
      alert("Please upload file!");
      return;
    }
    setSubmitDisabled(false);

    // alert("hello")

    // console.log(fr.result)
    // setPreviewSrc(fr.result)
    // setPreviewSrc(fr.readAsDataURL(File));
    // Uploading data to the server
    const formData = new FormData();
    console.log(File);
    formData.append("file", File);
    formData.append("filename", File.name);
    console.log(File.name);
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "multipart/form-data",
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
        setUUID(body.id);
      });
  };
  return (
    <div className="block">
      <div className="imgWrapper">
        <img src={previewSrc} className="canvas" />
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Label>Upload file to begin!</Form.Label>

        <InputGroup>
          <Form.Control onChange={onChange} type="file" />
          <Button type="submit" onSubmit={onSubmit}>
            Upload!
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
