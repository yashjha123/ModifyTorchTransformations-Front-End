import axios from 'axios';
import React, { useState } from 'react'
const Form = () => {
  const [File, setFile] = useState("")
  const [UUID, setUUID] = useState("")
  const [ImgURL,setImgURL] = useState("")
  const [Trans, setTrans] = useState("transforms = torch.nn.Sequential()")
  const onSubmit = (e) => {
    e.preventDefault();
    // alert("hello")

    const formData = new FormData();
    console.log(File)
    formData.append('file', File);
    formData.append('filename', File.name);
    console.log(File.name)
    const config = {
      headers: {
        'Access-Control-Allow-Origin': "*",
        'content-type': 'multipart/form-data',
      },
    };
    // axios.post("http://localhost:5000/fileUpload", formData,config)
    // .then((res)=>console.log(res));
    fetch("http://localhost:5000/fileUpload", {
      method: "POST",
      body: formData
    }).then((res) => res.json())
      .then(body => {
        setUUID(body.id)
      })
  }
  const onSubmit2 = (e) => {
    e.preventDefault()
    if(!UUID){
      alert("Upload image first!")
      return;
    }
    // fetch('http://localhost:5000/applyTransformations',{
    //   method: "POST",
    //   body: JSON.stringify({id:UUID,transforms:Trans}),
    //   headers: { 'Content-Type': 'application/json' },
    // }).then(res=>res.json())
    // .then(body=>{
    //   console.log(body)
    // })
    fetch('http://localhost:5000/applyTransformations',{
      method: "POST",
      body: JSON.stringify({id:UUID,transforms:Trans}),
      headers: { 'Content-Type': 'application/json' },
    }).then(res=>res.blob())
    .then(imageBlob=>{
      const imageObjectURL = URL.createObjectURL(imageBlob);
      console.log(imageObjectURL);
      setImgURL(imageObjectURL)
    })
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        {/* <input onChange={(e)=>setFile(e.target.value)} type="text"></input> */}
        <input name="InputImage" onChange={(e) => { e.preventDefault(); setFile(e.target.files[0]); }} type="file" />
        <input type="submit" onSubmit={onSubmit} />
      </form>
    </>
  )
}


export default Form;