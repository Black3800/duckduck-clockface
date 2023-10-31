import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import MqttWrapper from './components/MqttWrapper'
import { Root, Alarm } from './routes'

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/alarm",
      element: <Alarm />,
    }
  ]);

const App = ({}) => {
    return (
        <>
            <MqttWrapper
                deviceCode='SSAC19'
                protocol='wss'
                host='dc399c86e25e4f7d93816be797ce7109.s1.eu.hivemq.cloud'
                clientId='SSAC19'
                port={8884}
                username='anakint'
                password='5zV%J99iuE&8$vu8'
            >
                <RouterProvider router={router} />
            </MqttWrapper>
        </>
    )
}

export default App