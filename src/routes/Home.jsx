import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlarmContext, AlarmTriggerContext, SweetDreamsTriggerContext } from '../components/MqttWrapper'
import Clock from '../components/Clock'
import AlarmPopup from '../components/AlarmPopup'
import { login } from '../util/Api'
import LightControl from '../components/LightControl'

export default function Home() {
  const {alarmList} = useContext(AlarmContext)
  const { setAlarmTrigger } = useContext(AlarmTriggerContext)
  const { sweetDreamsTrigger }  = useContext(SweetDreamsTriggerContext)
  const navigate = useNavigate()
  const audioRef = useRef(new Audio());
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.3;

    const playAudio = async () => {
      try {
        await audio.play();
        console.info('Audio started playing.');
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    };

    if (sweetDreamsTrigger && sweetDreamsTrigger.audioUrl) {
      audio.src = sweetDreamsTrigger.audioUrl;
      setShowOverlay(true);
      playAudio();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [sweetDreamsTrigger]);

  useEffect(() => {
    for (const alarm of alarmList) {
      if (alarm.trigger === true) {
        setAlarmTrigger(alarm)
        setShowOverlay(false)
        navigate('/alarm')
      }
    }
  }, [alarmList])

  useEffect(() => {
    login()
  }, [])

  return (
    <>
      <AlarmPopup/>
      <Clock/>
      <LightControl/>
      {showOverlay ? 
        <div className="bedtime-overlay"></div> : 
        null
      }
    </>
  );
}