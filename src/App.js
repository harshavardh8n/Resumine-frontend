import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AnalyseUpload from './Pages/AnalyseUpload.jsx'
import Compare from './Pages/Compare.jsx'
import Navbar from './Components/Navabr.jsx'
import Creater from './Pages/Creater.jsx'
import Home from './Pages/Home.jsx'
// import PdfToTextExtractor from './Pages/PdfToTextExtractor.jsx'

const App = () => {
  return (
    <div>
        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/analyse'element={<AnalyseUpload/>}></Route>
            <Route path='/compare'element={<Compare/>}></Route>
            <Route path='/create'element={<Creater/>}></Route>
            <Route path='/'element={<Home/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App