import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import MqttWrapper from './components/MqttWrapper'
import { Connect, Home, Register, Alarm, ConnectBulb } from './routes'

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
      element: <Home />
    },
    {
      path: '/alarm',
      element: <Alarm />,
    }
  ]);

const App = ({}) => {
    return (
        <div id='app'>
            <MqttWrapper
                deviceCode='SSAC12'
                protocol='ws'
                host='34.87.44.54'
                clientId='SSAC12'
                port={9001}
                username='admin'
                password='123456789'
            >
                <RouterProvider router={router} />
            </MqttWrapper>
        </div>
    )
}

export default App