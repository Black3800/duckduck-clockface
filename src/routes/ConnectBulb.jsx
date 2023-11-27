import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { BaseURI, IlluminationURI } from '../util/Constant'

export default function ConnectBulb() {
  const navigate = useNavigate()
  const [IPInput, setIPInput] = useState('')

  function handleChange(e) {
    setIPInput(e.target.value)
  }

  function connectBulb() {
    axios.post(`${IlluminationURI}/bulb-connect`, {
      'ip': IPInput
    }).then(response => {
      if (response.data.status === 'ok') {
        navigate('/register')
      } else {
        alert('Cannot connect to bulb')
      }
    })
  }

  return (
      <div className='bulb-ip'>
        <h3>Connect Bulb: </h3>
        <input type='text' className='bulb-ip-input' value={IPInput} onChange={handleChange} placeholder='Bulb IP' />
        <input type='submit' value='Connect' className='bulb-ip-submit' onClick={connectBulb}/>
      </div>
  );
}