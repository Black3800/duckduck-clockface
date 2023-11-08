import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlarmTriggerContext } from '../components/MqttWrapper'
import Clock from '../components/Clock'

export default function Alarm() {
  const { alarmTrigger } = useContext(AlarmTriggerContext)
  const navigate = useNavigate()

  console.info('trigger!!!', alarmTrigger)

  useEffect(() => {
    
  }, [alarmTrigger])

  return (
    <>
      <Clock/>
      {alarmTrigger.description}
    </>
  );
}