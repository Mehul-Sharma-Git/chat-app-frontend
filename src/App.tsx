
import './App.css'

import Auth from './Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './Chat';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Connection from './Connection';
const App=()=> {

  return (
    <>
    <Auth/>
    {/* <Connection/> */}
    </>
  )
}

export default App
