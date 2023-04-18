import {  Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home"
import Auth from "./Pages/Auth"
import Create from "./Pages/Create"
import Saved from "./Pages/Saved"
import Navbar from './Components/Navbar';

function App() {

  return (
    <div className="App">
     
<Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/create' element={<Create />} />
          <Route path='/saved' element={<Saved />} />
        </Routes>
      
    </div>
  );
}

export default App;
