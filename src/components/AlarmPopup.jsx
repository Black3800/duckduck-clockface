import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, Grid, Paper } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import { AlarmContext } from '../components/MqttWrapper'
import { GetUpcomingDayIndex } from '../util/HelperFunction';

export default function AlarmPopup() {
  const alarmList = useContext(AlarmContext)
  const [nextAlarm, setNextAlarm] = useState(null)

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

    for (const alarm of alarmList) {
      const alarmHour = alarm.bed_time.hours;
      const alarmMinute = alarm.bed_time.minutes;

      for (const day of alarm.repeat_days) {
          const weekday = {
              'sun': 0, 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6
          }[day];

          const nextDay = nextWeekdayDate(currentDateTime, weekday);
          const alarmDate = new Date(
              nextDay.getFullYear(),
              nextDay.getMonth(),
              nextDay.getDate(),
              alarmHour,
              alarmMinute
          );

          if (alarmDate > currentDateTime && (nextAlarm === null || alarmDate < nextAlarm)) {
              newNextAlarm = alarm;
          }
      }
    }

    // Check if a next alarm was found
    if (nextAlarm) {
      console.log(`The next alarm is scheduled for: ${nextAlarm.toLocaleString()}`);
      setNextAlarm(newNextAlarm)
    } else {
      console.log("No future alarms found.");
    }
  }, [alarmList])

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
          height: '72px',
          background: 'var(--frost-white)',
          margin: 0
        }}>{alarmList.length > 0 ? <Box>{alarmList.toSorted((a, b) => GetUpcomingDayIndex(a.repeat_days) - GetUpcomingDayIndex(b.repeat_days))[0].description}</Box> : 'None'}</Container>
      </Grid>
    </Paper>
  );
}