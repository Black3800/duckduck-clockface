import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import axios from 'axios'

import { BaseURI, IlluminationURI } from '../util/Constant'
import WifiSelector from '../components/WifiSelector'

export default function Connect() {
  const navigate = useNavigate()
  const [isCheckedConnection, setIsCheckConnection] = useState(false)

  useEffect(() => {
    axios.get(BaseURI).then((response) => {
      onConnected()
    }).catch(error => {
      onNotConnected(error)
    });
  }, []);

  function onConnected() {
    axios.get(`${IlluminationURI}/state`).then((response) => {
      if (response.data.status === 'ok') {
        navigate('/home')
      } else {
        navigate('/connect-bulb')
      }
    })
  }

  function onNotConnected(err) {
    setIsCheckConnection(true)
  }

  return (
    <div className='connect'>
      {
        isCheckedConnection ? <WifiSelector /> : <CircularProgress />
      }
    </div>
  );
}