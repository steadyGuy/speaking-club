import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SnackBar from './components/SnackBar';
import IntroPage from './pages/IntroPage';
import JoinRoomPage from './pages/JoinRoomPage';
import RoomPage from './pages/RoomPage';
import { connectWithSocketIOServer } from './utils/wss'

function App() {
  useEffect(() => {

    connectWithSocketIOServer();
  }, [])

  return (
    <>
      {/* In dev mode, should be removed basename={process.env.PUBLIC_URL} */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/join-room" element={<JoinRoomPage />} />
          <Route path="/room" element={<RoomPage />} />
        </Routes>
      </BrowserRouter>
      <SnackBar />
    </>
  );
}

export default App;
