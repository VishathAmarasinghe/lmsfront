import React from 'react'
import InfoHeader from '../Components/InstitutionInfoComp/InfoHeader'
import Lecturers from '../Components/InstitutionInfoComp/Lecturers'
import InfoCardHolder from '../Components/InstitutionInfoComp/InfoCardHolder'

const InstitutionInfo = () => {
  return (
    <div className='w-full h-[100%] bg-[#EBEEFF] overflow-y-auto  '>
        <InfoHeader/>
        <InfoCardHolder/>
        <Lecturers/>
    </div>
  )
}

export default InstitutionInfo