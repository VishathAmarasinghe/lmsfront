import React from 'react'
import { loginpic, logo } from '../../assets'
import { LoginForm } from '../../Components/LoginForm'
import { Grow } from '@mui/material'

const Login = () => {
  return (
    <div className='w-full h-screen border-2 overflow-auto md:overflow-hidden   bg-[#EBEEFF]'>
      {/* <Grow> */}
      <div data-aos="fade-left" className='w-full  h-[10%] bg-[#EBEEFF] fixed top-0  flex items-center md:justify-end justify-center'>
            <img src={logo} className='w-44 mx-6' alt='logo'/>
        </div>
      {/* </Grow> */}
        
        <div className='w-full flex flex-col h-[100%]  md:flex-row md:justify-around'>
          <div data-aos="fade-right" className='w-full md:w-[45%] mt-16 md:mt-6  flex items-center justify-center'>
            <LoginForm/>
          </div>
          <div data-aos="fade-left" className='w-full md:w-[40%] shrink  flex items-center justify-center '>
            <img src={loginpic} alt="loginpic" />
          </div>
        </div>
    </div>
  )
}

export default Login