import React, { useContext, useEffect, useRef } from 'react';
import { AlarmContext, AlarmTriggerContext } from '../components/MqttWrapper';
import AlarmStopButton from '../components/AlarmStopButton';
import Clock from '../components/Clock';
import { useNavigate } from 'react-router-dom';

// Audio file URL
const audioUrl = 'https://storage.googleapis.com/duckduck-bucket/alarm-sound/digital.mp3'; // Replace this with your audio file URL

const Alarm = () => {
  const { alarmList, setAlarmList } = useContext(AlarmContext);
  const { alarmTrigger, setAlarmTrigger } = useContext(AlarmTriggerContext);
  const navigate = useNavigate();
  const audioRef = useRef(new Audio(audioUrl));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    // audio.volume = alarmTrigger.volume;
    console.log('alarmTrigger: '+alarmTrigger);
    console.log('alarmList: '+alarmList);

    const playAudio = async () => {
      try {
        await audio.play();
        console.info('Audio started playing.');
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    };

    if (alarmTrigger && alarmTrigger.description) {
      playAudio();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [alarmTrigger]);
  
  function stopAlarm() {
    const index = alarmList.findIndex((e) => e.trigger === true)
    alarmList[index].trigger = false
    setAlarmList([...alarmList])
    setAlarmTrigger({});
    navigate('/home');
  }

  return (
    <>
      <div className="alarm-desc">{Object.keys(alarmTrigger).length === 0 ? "Alarm" : alarmTrigger.description}</div>
      <Clock />
      <AlarmStopButton onClick={stopAlarm}/>
    </>
  );
};

export default Alarm;
