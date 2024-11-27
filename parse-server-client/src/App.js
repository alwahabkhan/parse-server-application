import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import LiveUserData from "./components/LivePosts.jsx";
import "./parse.js"

function App() {
  const [sessionToken, setSessionToken] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={sessionToken ? <LiveUserData /> : <Login setSessionToken={setSessionToken} />}
        />
        <Route path="/Login" element={<Login setSessionToken={setSessionToken} />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/LiveUserData" element={<LiveUserData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
