import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Chat from './Chat';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Connection from './Connection';

const WS_URL = 'ws://localhost:8080/ws';




export interface AuthProps {

}

const Auth:React.FC<AuthProps>=(props)=> {

  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [OTP, setOTP] = useState("")

  useEffect(()=>{
    console.log("callOnce")
  },[])
  const login = (e:any) =>{
    e.preventDefault()

    axios.post("http://localhost:8080/login",{
        "username" : username,
      "password" : password
    },

    ).then((response:any)=>{
        
        if (response){
            console.log("this")
            
            setOTP(response.data.otp)
        }
    })
  }
  
  return (
    <>
     {!OTP?<div className="center">
        
      <h1>Chat Application</h1>
      {/* <h3 id ="chat-header">Currently in chat : {currentChat}</h3> */}
      <h4 id = 'connection-status' >`Connected to webSocket : {`${connected}`}</h4>
      
      <form id="auth">
        <label htmlFor='username'> UserName </label>
        <input type='text' id='username' name='username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/><br/><br/>
        <label htmlFor='password'> Password</label>
        <input type="password" id='password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/><br/>
        <button onClick={login}>Login</button>
      </form>
      {/* <form id="chatroom-selection">
        <label htmlFor='chatroom'> Select Chatroom </label>
        <input type='text' id='chatroom' name='chatroom' value={currentChat} onChange={(e)=>{setCurrentChat(e.target.value)}}/><br/><br/>
        <button onClick={changeChatRoom}>Change</button>
      </form> */}

      <br/>
{/* 
      <textarea id='chatMessages' className="messageArea" readOnly name="chatMessages" rows={4} cols={50} placeholder='Your chat text'/>

      <br/>

      <form id='chatroomMessage'>
        <label htmlFor='message'>Message</label>
        <input type='text' id='message' name='message' value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
        <button onClick={sendChatMessage}>Send</button>
      </form> */}
     </div>:<Connection otp={OTP}/>}
     
    </>
  )
}

export default Auth
