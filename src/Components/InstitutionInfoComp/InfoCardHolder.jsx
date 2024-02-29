import React from 'react'
import InfoCards from './InfoCards'

const InfoCardHolder = () => {
  return (
    <div className=" flex flex-col md:flex-row  m-5 justify-between  ">
        <InfoCards/>
        <InfoCards/>
        <InfoCards/>
    </div>
  )
}

export default InfoCardHolder