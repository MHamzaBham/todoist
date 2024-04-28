import './App.css';
import Home from './Components/Home'
import Login from './Components/Login';
import Signup from './Components/Signup';
import { Routes, Route } from 'react-router-dom'
import { APIPathContext } from './Contexts/APIPathContext'


function App() {
  return (
    <>
      <APIPathContext.Provider value='https://todoist-beta.vercel.app'>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

      </APIPathContext.Provider>
    </>
  );
}

export default App;
