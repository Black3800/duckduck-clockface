import React, { useContext, useEffect, useRef } from 'react'
import { AlarmContext } from '../components/MqttWrapper'
import { useNavigate } from 'react-router-dom'

export default function AlarmManager({children}) {
  const alarmList = useContext(AlarmContext)
  const alarmTimeout = useRef({})
  const navigate = useNavigate()

  useEffect(() => {
    for (const alarm of alarmList) {
        console.log(alarmTimeout.current)
        console.log(alarm.id)
        console.log(typeof alarm.id)
        console.log(alarmTimeout.current.hasOwnProperty(alarm.id))
      if (!alarmTimeout.current.hasOwnProperty(alarm.id)) {
        // const timeout = setTimeout(() => {
        //     navigate('/alarm')
        // }, 1000)
        // const newAlarmTimeout = {
        //     ...alarmTimeout
        // }
        // newAlarmTimeout[alarm.id] = timeout
        // alarmTimeout.current = {
        //     ...newAlarmTimeout
        // }
      }
    }
  }, [alarmList])

  return (
    <>
      {children}
    </>
  );
}