import React from 'react'
import Loading from 'react-loading-components';

const LoadingInnerPage = () => {
  return (
    <div className="w-full h-[90%] flex flex-col items-center justify-center bg-white shadow-2xl rounded-2xl overflow-y-auto  ">
        <Loading  type='tail_spin' width={70} height={70} fill='#5B6BD4' />
    </div>
  )
}

export default LoadingInnerPage