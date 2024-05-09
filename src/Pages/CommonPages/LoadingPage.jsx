import React from 'react'
import Loading from 'react-loading-components';

const LoadingPage = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-[#EBEEFF]'>
       <Loading type='tail_spin' width={100} height={100} fill='#5B6BD4' />
    </div>
  )
}

export default LoadingPage