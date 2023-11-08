import React, { useEffect, useState } from 'react'

export default function Clock() {
  const [time, setTime] = useState(new Date())

  function updateTime() {
    setTime(new Date())
  }

  function padNum(num) {
    if (num < 10) {
        return '0' + num.toString()
    } else {
        return num.toString()
    }
  }

  useEffect(() => {
    setInterval(updateTime, 500)
  }, [])

  return (
    <>
      <div className="clock">
        <span className='clock-num'>
          {time.getHours()} <span className='clock-tick'>:</span> {padNum(time.getMinutes())}
          {/* <span className='clock-num-seconds'>{padNum(time.getSeconds())}</span> */}
        </span>
      </div>
    </>
  );
}