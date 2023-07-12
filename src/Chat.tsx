import { useEffect, useState } from 'react'

import './App.css'


interface Event {
  Type: String
  Payload: any

}

export interface ChatProps {
    sendMessage: any
    lastMessage: any
    readyState: any
    test:any
}
const Chat:React.FC<ChatProps>=(props)=> {

  const [currentChat, setCurrentChat] = useState("general")
  const [message, setMessage] = useState("")
  const [messageHistory, setMessageHistory] = useState<any>([]);
  const [connected, setConnected] = useState(false)
  
  const {sendMessage, lastMessage, readyState} = props
console.log(lastMessage)
console.log("123")
console.log(sendMessage)
console.log(sendMessage())
  // useEffect(()=>{
  //   if (lastMessage !== null) {
  //     setMessageHistory((prev:any) => prev.concat(lastMessage));
  //   }
  // }, [lastMessage, setMessageHistory]);

  const changeChatRoom = (e:any) =>{
    e.preventDefault()
    console.log(e.target.value)
   
  }

  const sendChatMessage = (e : any) =>{
    e.preventDefault()
    const event :Event={
      Type: "Send Message",
      Payload: message
    }
    sendEvent(event)
  }

  const sendEvent = (event : Event) =>{
    sendMessage(JSON.stringify(event))
  }
  return (
    <>
     <div className="center">
      <h1>Chat Application</h1>
      <h3 id ="chat-header">Currently in chat : {currentChat}</h3>
      <h4 id = 'connection-status' >Connected to webSocket : {connected}</h4>
      <form id="chatroom-selection">
        <label htmlFor='chatroom'> Select Chatroom </label>
        <input type='text' id='chatroom' name='chatroom' value={currentChat} onChange={(e)=>{setCurrentChat(e.target.value)}}/><br/><br/>
        <button onClick={changeChatRoom}>Change</button>
      </form>

      <br/>

      <textarea id='chatMessages' className="messageArea" readOnly name="chatMessages" rows={4} cols={50} placeholder='Your chat text'/>

      <br/>

      <form id='chatroomMessage'>
        <label htmlFor='message'>Message</label>
        <input type='text' id='message' name='message' value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
        <button onClick={sendChatMessage}>Send</button>
      </form>
     </div>
    </>
  )
}

export default Chat
