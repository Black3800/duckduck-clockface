import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlarmContext, AlarmTriggerContext, SweetDreamsTriggerContext } from '../components/MqttWrapper'
import Clock from '../components/Clock'
import AlarmPopup from '../components/AlarmPopup'
import { login } from '../util/Api'

const audioUrl = 'https://storage.googleapis.com/duckduck-bucket/lullaby-song/Instrument/cradle-of-soul.mp3';

export default function Home() {
  const {alarmList} = useContext(AlarmContext)
  const { setAlarmTrigger } = useContext(AlarmTriggerContext)
  const { sweetDreamsTrigger }  = useContext(SweetDreamsTriggerContext)
  const navigate = useNavigate()

  const audioRef = useRef(new Audio(audioUrl));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    // audio.volume = 0.2;

    const playAudio = async () => {
      try {
        await audio.play();
        console.info('Audio started playing.');
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    };

    if (sweetDreamsTrigger && sweetDreamsTrigger.audioUrl) {
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
      console.log(alarm)
      if (alarm.trigger === true) {
        setAlarmTrigger(alarm)
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
    </>
  );
}