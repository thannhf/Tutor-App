import { useState } from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Tutors from './pages/Tutors'
import Login from './pages/Login'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MySessions from './pages/MySessions'
import Session from './pages/session'
import Verify from './pages/Verify'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <main className='overflow-hidden bg-light text-tertiary'>
      <ToastContainer position='bottom-right' />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tutors' element={<Tutors />} />
        <Route path='/tutors/:subject' element={<Tutors />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-sessions' element={<MySessions />} />
        <Route path='/session/:tutId' element={<Session />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
