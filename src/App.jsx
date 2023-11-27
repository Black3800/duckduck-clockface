import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import MqttWrapper from './components/MqttWrapper'
import { Connect, Home, Register, Alarm, ConnectBulb } from './routes'
import { MqttHost, MqttPort } from './util/Constant';
import { DEVICE_CODE, MQTT_PASS, MQTT_USER } from './util/Config';

const router = createBrowserRouter([
    {
      path: '/',
      element: <Connect/>,
    },
    {
      path: '/connect-bulb',
      element: <ConnectBulb/>,
    },
    {
      path: '/register',
      element: <Register/>,
    },
    {
      path: '/home',
      element: <Home/>
    },
    {
      path: '/alarm',
      element: <Alarm/>,
    }
  ]);

const App = ({}) => {
    return (
        <div id='app'>
            <MqttWrapper>
                <RouterProvider router={router} />
            </MqttWrapper>
        </div>
    )
}

export default App