import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const InputSequence = ({ setConf, SubmitDisabled, ImgURL, setImgURL, setUUID, UUID, Trans, setTrans }) => {


  const onSubmit2 = (e) => {
    e.preventDefault()
    if (!UUID) {
      alert("Upload image first!")
      return;
    }
    var responseHeaders;
    fetch('http://localhost:5000/applyTransformations', {
      method: "POST",
      body: JSON.stringify({
        id: UUID, transforms: Trans, conf: {
          "normalize_range": true,
          "scale_range": false
        }
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.formData())
      .then(res => {
        const val = (JSON.parse(res.get("field0")));
        setConf(JSON.stringify(val))
        const imageObjectURL = URL.createObjectURL(res.get("field1"))
        console.log(imageObjectURL);
        setImgURL(imageObjectURL)
      })
  }
  return (
    <div className='block'>
      <Form onSubmit={onSubmit2}>
      {/* <form onSubmit={onSubmit2}> */}
        <textarea style={{ width: "20rem" }} value={Trans} onChange={(e) => setTrans(e.target.value)}></textarea>
        <br />
        <Button type="submit" onSubmit={onSubmit2} disabled={SubmitDisabled}>Apply!</Button>
        {/* <input type="submit" onSubmit={onSubmit2} disabled={SubmitDisabled} /> */}
        <p style={{ "fontSize": '11px' }}>
          {SubmitDisabled ? "Upload image first!" : ""}
        </p>

        </Form>
    </div>
  )
}

export default InputSequence