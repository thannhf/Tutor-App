import { useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import AllSessions from './pages/admin/AllSessions'
import AddTutor from './pages/admin/AddTutor'
import TutorsList from './pages/admin/TutorsList'
import { AdminContext } from './context/AdminContext'
import Login from './pages/admin/Login'
import { TutorContext } from './context/TutorContext'
import TutorDashboard from './pages/tutor/TutorDashboard'
import TutorSessions from './pages/tutor/TutorSessions'
import TutorProfile from './pages/tutor/TutorProfile'

function App() {
  const {atoken, setAtoken} = useContext(AdminContext)
  const {tToken, setTToken} = useContext(TutorContext)

  return atoken || tToken ? (
    <main>
      <ToastContainer position='bottom-right' />
      <div className='bg-light text-tertiary'> 
        <div className='mx-auto max-w-[1494px] flex flex-col sm:flex-row'>
          <Sidebar />
          <Routes>
            {/* ADMIN ROUTES */}
            <Route path='/' element={<></>} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-sessions' element={<AllSessions />} />
            <Route path='/add-tutor' element={<AddTutor />} />
            <Route path='/tutors-list' element={<TutorsList />} />

            {/* Tutor ROUTES */}
            <Route path='/tutor-dashboard' element={<TutorDashboard />} />
            <Route path='/tutor-sessions' element={<TutorSessions />} />
            <Route path='/tutors-profile' element={<TutorProfile />} />
          </Routes>
        </div>
      </div>
    </main>
  ) : (
    <main>
      <ToastContainer position='bottom-right' />
      <Login />
    </main>
  )
}

export default App
