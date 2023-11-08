import React, { createContext, useEffect, useState } from 'react'
import * as mqtt from 'mqtt/dist/mqtt.min'

export const ClientContext = createContext()
export const AlarmContext = createContext([])
export const AlarmTriggerContext = createContext({})

const MqttWrapper = ({ deviceCode, protocol, host, clientId, port, username, password, children }) => {
  const [client, setClient] = useState(null)
  const [alarmList, setAlarmList] = useState([])
  const [alarmTrigger, setAlarmTrigger] = useState({})

  const [payload, setPayload] = useState({})
  const _alarmList = []

  const mqttConnect = (host, mqttOption) => {
    setClient(mqtt.connect(host, mqttOption))
  }

  const createAlarm = (payload) => {
    _alarmList.push(payload)
  }

  const handle_message = (topic, message) => {
    console.log(`received message: ${message} from topic: ${topic}`)
    let payload = JSON.parse(message)
    setPayload({topic,payload})
  }

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        console.log('connection successful')
        mqttSub({
          'topic': `${deviceCode}/#`,
          qos: 2
        })
      })
      
      client.on('error', (err) => {
        console.error('Connection error: ', err)
        client.end()
      })

      client.on('reconnect', () => {
        // setConnectStatus('Reconnecting')
      })
      
      client.on('message', handle_message)
    }
  }, [client])

  useEffect(() => {
    const url = `${protocol}://${host}:${port}/mqtt`
    const options = {
      clientId,
      username,
      password,
      clean: false,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // ms
      protocolVersion: 5
    }
    mqttConnect(url, options)
  }, [])

  useEffect(() => {
    if (payload.topic === `${deviceCode}/create-alarm`) {
      delete payload.topic
      setAlarmList([
        ...alarmList,
        payload.payload
      ])
    } else if (payload.topic === `${deviceCode}/trigger-alarm`) {
      const index = alarmList.findIndex((e) => e.id === payload.payload.id)
      alarmList[index].trigger = true
      setAlarmList([...alarmList])
    }
  }, [payload])

  const mqttSub = (subscription) => {
    if (client) {
      // topic & QoS for MQTT subscribing
      const { topic, qos } = subscription
      // subscribe topic
      // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        console.log(`Subscribe to topics: ${topic}`)
      })
    }
  }

  return (
    <ClientContext.Provider value={client}>
      <AlarmContext.Provider value={alarmList}>
        <AlarmTriggerContext.Provider value={{alarmTrigger, setAlarmTrigger}}>
          {children}
        </AlarmTriggerContext.Provider>
      </AlarmContext.Provider>
    </ClientContext.Provider>
  )
}

export default MqttWrapper
