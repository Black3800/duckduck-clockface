import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterContext } from '../components/MqttWrapper'

export default function Alarm() {
  const isRegistered = useContext(RegisterContext)
  const navigate = useNavigate()

  if (localStorage.getItem('isRegistered') == 'true') {
    console.error('Should have gone to root')
    navigate('/home')
  }

  useEffect(() => {
    console.log('get ', isRegistered)
    if (isRegistered === true) {
      navigate('/home')
    }
  }, [isRegistered])

  return (
    <div className='register'>
      Registerss
    </div>
  );
}