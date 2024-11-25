import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"; // Import useState
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

function App() {
  const [sessionToken, setSessionToken] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={sessionToken ? <h1>Welcome to the Dashboard</h1> : <Login setSessionToken={setSessionToken} />}
        />
        <Route path="/Login" element={<Login setSessionToken={setSessionToken} />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
