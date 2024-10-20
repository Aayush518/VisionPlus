import { useState } from 'react'
import {Routes, Route, Navigate} from "react-router-dom";
import './App.css'
import Welcome from "./Components/Welcome/Welcome.jsx";
import SelectPage from "./Components/SelectPage/SelectPage.jsx";
import Uploading from "./Components/Uploading/Uploading.jsx";
import Main from "./Components/Main/Main.jsx";


function App() {

  return (
    <Routes>
        <Route path ="/" element={<Welcome />} />
        <Route path ="/selectpage" element={<SelectPage />} />
        <Route path ="/uploading" element={<Uploading />} />
        <Route path ="/main" element={<Main />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
