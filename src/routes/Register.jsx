import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterContext } from '../components/MqttWrapper'
import { DEVICE_CODE } from '../util/Config'

export default function Alarm() {
  const isRegistered = useContext(RegisterContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('isRegistered') == 'true') {
      console.error('Should have gone to root')
      navigate('/home')
    }
  }, [])

  useEffect(() => {
    if (isRegistered === true) {
      navigate('/home')
    }
  }, [isRegistered])

  return (
    <div className='register'>
      <div className='register-code'>{DEVICE_CODE}</div>
    </div>
  );
}