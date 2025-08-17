import Landing from './components/landing'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/signup'
import Signin from './components/signin'
import AdminSignup from './components/adminSignup.jsx'
import UserSignup from './components/userSignup.jsx'
import AdminSignin from './components/adminSignin.jsx'
import UserSignin from './components/userSignin.jsx'
import AdminHome from './components/adminHome.jsx'
import UserHome from './components/userHome.jsx'
import AdminShowCourses from './components/adminShowCourse.jsx'
import CreateCourse from './components/createCourse.jsx'
import UserShowCourses from './components/userShowCourses.jsx'
import PurchaseCourses from './components/purchaseCourses.jsx'
import ShowPurchasedCourses from './components/showPurchasedCourses.jsx'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/adminSignup" element={<AdminSignup />} />
          <Route path="/usersignup" element={<UserSignup />} />          
          <Route path="/adminSignin" element={<AdminSignin />} />
          <Route path="/userSignin" element={<UserSignin />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/adminShowCourses" element={<AdminShowCourses />} />
          <Route path="/createCourse" element={<CreateCourse />} />
          <Route path="/userShowCourses" element={<UserShowCourses />} />
          <Route path="/purchaseCourses/:id" element={<PurchaseCourses />} />
          <Route path="/showPurchasedCourses" element={<ShowPurchasedCourses />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
