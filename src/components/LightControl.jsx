import React, { useState } from 'react'
import { IconButton } from '@mui/material';
import TungstenIcon from '@mui/icons-material/Tungsten';
import { setBulbPower } from '../util/Api';

export default function LightControl() {
  const [power, setPower] = useState(true)

  function updatePower(e) {
    e.preventDefault()
    setPower(!power)
    setBulbPower(!power)
  }

  return (
    <IconButton onClick={updatePower} className='light-control'>
        <TungstenIcon fontSize='large' htmlColor={power ? '#3EB7F4' : '#2A2A2A'}/>
    </IconButton>
  );
}