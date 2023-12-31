import React from 'react'
import { Box, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export default function AlarmStopButton({onClick}) {
  return (
    <Button variant='contained' onClick={onClick} sx={{
        backgroundColor: 'var(--sky-blue)',
        fontSize: '48px',
        fontWeight: '600',
        width: '400px',
        height: '140px',
        textTransform: 'none',
        borderRadius: '234px',
        position: 'fixed',
        bottom: '40px',
        left: '440px'
    }}>
        <CheckIcon fontSize='50px' fontWeight='600'/>
        <Box sx={{width: '36px'}} />
        Stop
    </Button>
  );
}