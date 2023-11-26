import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { IlluminationURI } from '../util/Constant'

export default function WifiSelector() {
  // const [wifiList, setWifiList] = useState([])

  // useEffect(() => {
  //   fetchWifiList()
  // }, [])

  // function fetchWifiList() {
  //   axios.get(`${IlluminationURI}/connectivity/scan`)
  //   .then(response => {
  //     setWifiList(response.data)
  //   })
  // }

  return (
    <div className="wifi-selector">
      <div>
        Connect to the same Wi-Fi with the bulb and refresh to continue
      </div>
    </div>
  );
}