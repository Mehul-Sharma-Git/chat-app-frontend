import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Chat from './Chat';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const WS_URL = 'ws://localhost:8080/ws';

interface Event {
    Type: String
    Payload: any
  
  }

  interface ConnectionProps{
    otp: any
  }
  const request:Event = {
    Type: "Send Message",
    Payload:{
      From: "none",
      Message: "connected"
    }
  
  };

const ConnectWebSocket:React.FC<ConnectionProps> = (props) =>{

  const [sm, setSendMessage] = useState<any>(()=>()=>{console.log("function")})
  const [lm, setLastMessage] = useState<any>(null)
  const [rs, setReadyState] = useState<any>(null)
    const [ws, setWs] = useState<any>(null);

      const routeEvent = (event:Event) =>{
        if (event.Type === undefined){
          alert("no event")
        }
    
        switch(event.Type){
          case "New Message" : 
            console.log("new message")
            console.log(event.Payload)
            break;
          case "Send Message" : 
            console.log("Sent Message")
            console.log(event.Payload)
            break;
    
          default : alert("unsupported message type")
          break;
          
        }
      }
        const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
            onOpen: () => {
              console.log('WebSocket connection established.');
                setSendMessage(()=>sendMessage)
                setLastMessage(lastMessage)
                setReadyState(readyState)
                console.log(sm)
                sendMessage(JSON.stringify(request))
            },
            onClose: () =>{
                console.log("Connection closed")
               
            },
            // shouldReconnect: (closeEvent) => true,
            onMessage: (evt:any) =>{
                evt.preventDefault()
              console.log(evt)
              const eventData: Event = JSON.parse(evt.data)
              console.log(eventData)
              routeEvent(eventData)
              return false
    
            },
            queryParams: {
              'otp': props.otp,
            }
          })
    //     console.log(props.otp)
    //     const wsClient = new WebSocket(WS_URL+props.otp);
    // wsClient.onopen = () => {
    //   setWs(wsClient);
    //   wsClient.send(JSON.stringify(request));
    // };
    // wsClient.onclose = () => console.log('ws closed');
    // return () => {
    //   wsClient.close();
    // };

      // useEffect(() => {
      //   if (ws) {
      //     ws.onmessage = (evt:any) => {
      //       console.log(evt)
      //       // const trade = JSON.parse(evt.data);
      //       // const newTrades = [...trades];
      //       // addTradeToList(trade, newTrades);
      //     };
      //   }
      // }, [ws]);

      return(
        <Chat sendMessage={sm} lastMessage={lm} readyState={rs} test={undefined}/>
      )
}

export default ConnectWebSocket