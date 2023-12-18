import React, { createContext, useEffect, useState, useRef } from 'react'
import * as mqtt from 'mqtt/dist/mqtt.min'
import { getAlarm, login } from '../util/Api'
import { DEVICE_CODE, MQTT_PASS, MQTT_USER } from '../util/Config'
import { MqttHost, MqttPort } from '../util/Constant'

export const RegisterContext = createContext()
export const ClientContext = createContext()
export const AlarmContext = createContext([])
export const AlarmTriggerContext = createContext({})
export const SweetDreamsTriggerContext = createContext({})

const MqttWrapper = ({ children }) => {
  const initialized = useRef(false);
 
  const [client, setClient] = useState(null)
  const [alarmList, setAlarmList] = useState([])
  const [alarmTrigger, setAlarmTrigger] = useState({})
  const [sweetDreamsTrigger, setSweetDreamsTrigger] = useState({})
  const [isRegistered, setIsRegistered] = useState(localStorage.getItem('isRegistered') == 'true' || false)

  const [payload, setPayload] = useState({})
  const _alarmList = []

  const deviceCode = DEVICE_CODE
  const protocol = 'ws'
  const host = MqttHost
  const clientId = DEVICE_CODE
  const port = MqttPort
  const username = MQTT_USER
  const password = MQTT_PASS

  const mqttConnect = (host, mqttOption) => {
    setClient(mqtt.connect(host, mqttOption))
  }

  const socketConnect = () => {
    const socket = new WebSocket("ws://localhost:8080");

    // Connection opened
    socket.addEventListener("open", (event) => {
      console.log("Connection established");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      handle_message(data.topic, data.payload);
    });
    setClient(socket);
      getAlarm().then((response) => {
        if (response.data.success === true) {
          setAlarmList([...response.data.data])
        }
      }).catch(error => {
        login()
      })
  }

  const createAlarm = (payload) => {
    _alarmList.push(payload)
  }

  const handle_message = (topic, message) => {
    console.log('received message:', message, 'from topic:', topic)
    setPayload({
      topic,
      payload: message
    })
  }

//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:8080")

// // Connection opened
// socket.addEventListener("open", event => {
//   socket.send("Connection established")
// });

// // Listen for messages
// socket.addEventListener("message", event => {
//   console.log("Message from server ", event.data)
// });

  //   if (client) {
  //     client.on('connect', () => {
  //       console.log('connection successful')
  //       mqttSub({
  //         'topic': `${deviceCode}/#`,
  //         qos: 2
  //       })
  //     })
      
  //     client.on('error', (err) => {
  //       console.error('Connection error: ', err)
  //       client.end()
  //     })

  //     client.on('reconnect', () => {
  //       console.log('reconn')
  //     })
      
  //     client.on('message', handle_message)
  //   }
  // }, [client])

  useEffect(() => {
    // if (!initialized.current) {
    //   initialized.current = true
    //   const url = `${protocol}://${host}:${port}/mqtt`
    //   const options = {
    //     clientId,
    //     username,
    //     password,
    //     clean: false,
    //     reconnectPeriod: 1000, // ms
    //     connectTimeout: 30 * 1000, // ms
    //     protocolVersion: 5
    //   }
    //   mqttConnect(url, options)
    //   getAlarm().then((response) => {
    //     if (response.data.success === true) {
    //       setAlarmList([...response.data.data])
    //     }
    //   }).catch(error => {
    //     login()
    //   })
    // }
    if (!initialized.current) {
      initialized.current = true
      socketConnect()
    }
  }, [])

  useEffect(() => {
    console.log(payload)
    if (payload.topic === `${deviceCode}/register`) {
      if (payload.payload.device_code == deviceCode) {
        localStorage.setItem('isRegistered', true)
        setIsRegistered(true)
      }
    }
    else if (payload.topic === `${deviceCode}/create-alarm`) {
      delete payload.topic;
      if (payload.payload.is_active.status === true) {
        setAlarmList([...alarmList, payload.payload]);
      }
    } else if (payload.topic === `${deviceCode}/update-alarm`) {
      delete payload.topic;
      const newAlarmList = alarmList.filter(
        (alarm) => alarm.id != payload.payload.id
      );
      if (payload.payload.is_active.status === true) {
        newAlarmList.push(payload.payload);
      }
      setAlarmList([...newAlarmList]);
    } else if (payload.topic === `${deviceCode}/delete-alarm`) {
      setAlarmList([
        ...alarmList.filter((alarm) => alarm.id != payload.payload.id),
      ]);
    } else if (payload.topic === `${deviceCode}/trigger-alarm`) {
      const index = alarmList.findIndex((e) => e.id === payload.payload.id);
      alarmList[index].trigger = true;
      setAlarmList([...alarmList]);
    } else if (payload.topic === `${deviceCode}/sweet-dreams`) {
      setSweetDreamsTrigger({
        ...payload.payload,
      });
    } else if (payload.topic === `${deviceCode}/ping`) {
      console.log("ping", payload.message.c);
    }
  }, [payload])

  return (
    <ClientContext.Provider value={client}>
      <RegisterContext.Provider value={isRegistered}>
        <AlarmContext.Provider value={{alarmList, setAlarmList}}>
          <AlarmTriggerContext.Provider value={{alarmTrigger, setAlarmTrigger}}>
            <SweetDreamsTriggerContext.Provider value={{sweetDreamsTrigger, setSweetDreamsTrigger}}>
              {children}
            </SweetDreamsTriggerContext.Provider>
          </AlarmTriggerContext.Provider>
        </AlarmContext.Provider>
      </RegisterContext.Provider>
    </ClientContext.Provider>
  )
}

export default MqttWrapper
