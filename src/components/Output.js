import React from 'react'

const Output = ({ImgURL}) => {

  return (
    <div className='block'>
        <div className='imgWrapper'>
            <img className="canvas" src={ImgURL} />
        </div>
    </div>
  )
}

export default Output