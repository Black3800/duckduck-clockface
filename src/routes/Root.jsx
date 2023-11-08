import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlarmContext, AlarmTriggerContext } from '../components/MqttWrapper'
import Clock from '../components/Clock'

export default function Root() {
  const alarmList = useContext(AlarmContext)
  const { setAlarmTrigger } = useContext(AlarmTriggerContext)
  const navigate = useNavigate()

  useEffect(() => {
    for (const alarm of alarmList) {
      console.log(alarm)
      if (alarm.trigger === true) {
        setAlarmTrigger(alarm)
        navigate('/alarm')
      }
    }
  }, [alarmList])

  return (
    <>
      <Clock/>
    </>
  );
}