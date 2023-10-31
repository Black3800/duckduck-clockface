import React, { useContext, useEffect } from 'react'
import { AlarmContext } from '../components/MqttWrapper'
import AlarmManager from '../components/AlarmManager'

export default function Root() {
  const alarmList = useContext(AlarmContext)

  useEffect(() => {
    // for (const alarm of alarmList) {
    //   console.log(alarm)
    // }
  }, [alarmList])

  return (
    <>
      {/* <AlarmManager>
        <div>hello</div>
      </AlarmManager> */}
      Hello
      {alarmList.map((e, i) => <div>
        <ul>
          {Object.keys(e).map((ek, ik) => <li>{`${ek}: ${e[ek]}`}</li>)}
        </ul>
        <br/>
      </div>)}
    </>
  );
}