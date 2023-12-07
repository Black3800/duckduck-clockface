import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, Grid, Paper } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import { AlarmContext } from '../components/MqttWrapper'
import { DaysInWeek } from '../util/Constant';

const weekday = {
  'sun': 0, 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6
};

export default function AlarmPopup() {
  const {alarmList} = useContext(AlarmContext)
  const [nextAlarm, setNextAlarm] = useState(null)
  const [nextAlarmDate, setNextAlarmDate] = useState('')

  useEffect(() => {
    // Get current date and time
    const currentDateTime = new Date();

    // Define a function to get the next occurrence of a particular weekday
    function nextWeekdayDate(date, weekday) {
      const daysUntilNextWeekday = (7 + weekday - date.getDay()) % 7;
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + daysUntilNextWeekday);
      return nextDate;
    }

    // Find the next alarm after the current time
    let newNextAlarm = null;
    let newNextAlarmDate = null;

    for (const alarm of alarmList) {
      const alarmHour = alarm.wake_up_time.hours;
      const alarmMinute = alarm.wake_up_time.minutes;

      for (const day of alarm.repeat_days) {
          const week_day = weekday[day];
          const nextDay = nextWeekdayDate(currentDateTime, week_day);
          const alarmDate = new Date(
              nextDay.getFullYear(),
              nextDay.getMonth(),
              nextDay.getDate(),
              alarmHour,
              alarmMinute
          );

          if (alarmDate > currentDateTime && (newNextAlarm === null || alarmDate < newNextAlarmDate)) {
              newNextAlarm = alarm;
              newNextAlarmDate = alarmDate;
          }
      }
    }

    // Check if a next alarm was found
    if (newNextAlarm) {
      // console.log(`The next alarm is scheduled for: ${nextAlarm.toLocaleString()}`);
      setNextAlarmDate(`${DaysInWeek[newNextAlarmDate.getDay()]}, ${formatAlarmTime(newNextAlarm.wake_up_time)}`);
      setNextAlarm(newNextAlarm);
    } else {
      console.log("No future alarms found.");
    }
    
  }, [alarmList])

  function formatAlarmTime(time) {
    return `${time.hours}:${time.minutes.toString().padStart(2,'0')}`
  }

  return (
    <Paper elevation={3}>
      <Grid container spacing={0} sx={{
      position: 'fixed',
      top: '16px',
      left: '16px'
      }}>
        <Container sx={{
          width: '72px',
          height: '72px',
          background: 'var(--sky-blue)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0
        }} disableGutters={true}>
          <AlarmIcon sx={{ fontSize: 60, color: 'var(--frost-white)' }}/>
        </Container>
        <Container sx={{
          width: '400px',
          height: '72px',
          lineHeight: '72px',
          fontSize: '24px',
          background: 'var(--frost-white)',
          margin: 0
        }}>{(alarmList.length > 0 && nextAlarm !== null && nextAlarmDate !== null) ? <Box>Next alarm on {nextAlarmDate}</Box> : 'No alarm set'}</Container>
      </Grid>
    </Paper>
  );
}