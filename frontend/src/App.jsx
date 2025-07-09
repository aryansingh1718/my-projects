import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/landing'
import './index.css';
import StartQuiz from './components/startQuiz';
import ShowResult from './components/showResult';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
        <Routes>
           <Route path="/" element={<Landing />} />
           <Route path="/startQuiz" element={<StartQuiz />} />
           <Route path="/showResult" element={<ShowResult />} />
        </Routes>
        </BrowserRouter>
      </RecoilRoot>
    
    </div>
  )
}

export default App