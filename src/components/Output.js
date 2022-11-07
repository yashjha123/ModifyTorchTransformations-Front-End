import React from 'react'

const Output = () => {
  return (
    <div>
        <form onSubmit={onSubmit2}>
        <textarea style={{ width: "50rem" }} value={Trans} onChange={(e) => setTrans(e.target.value)}></textarea>
        <br />
        <img src={ImgURL} />
        <input type="submit" onSubmit={onSubmit2} />
        {/* <input style={{width:"50rem"}}onChange={(e)=>setTrans(e.target.value)} value={Trans} type="text" /> */}
      </form>
    </div>
  )
}

export default Output