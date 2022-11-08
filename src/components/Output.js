import React from 'react'

const Output = ({Conf,ImgURL}) => {

  return (
    <div className='block'>
        <div className='imgWrapper'>
            <img className="canvas" src={ImgURL} />
        </div>
        {Conf}
    </div>
  )
}

export default Output