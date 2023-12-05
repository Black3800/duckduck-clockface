import React, { useContext, useEffect, useRef } from 'react';
import { AlarmTriggerContext } from '../components/MqttWrapper';
import AlarmStopButton from '../components/AlarmStopButton';
import Clock from '../components/Clock';

// Audio file URL
const audioUrl = 'https://storage.googleapis.com/duckduck-bucket/alarm-sound/digital.mp3'; // Replace this with your audio file URL

const Alarm = () => {
  const { alarmTrigger } = useContext(AlarmTriggerContext);
  const audioRef = useRef(new Audio(audioUrl));

  useEffect(() => {
    const audio = audioRef.current;

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

  return (
    <>
      <div className="alarm-desc">{Object.keys(alarmTrigger).length === 0 ? "Alarm" : alarmTrigger.description}</div>
      <Clock />
      <AlarmStopButton/>
    </>
  );
};

export default Alarm;
