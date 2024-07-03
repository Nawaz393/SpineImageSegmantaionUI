import { Route, Routes } from 'react-router-dom'
import { Login, Segmant2d } from './pages'
import { Signup } from './pages'
import { SidebarLayout, NavbarLayout } from './components/Layouts'
import Segmant3d from './pages/Segmant3d/Segmant3d'
import PersonalInfo from './pages/PersonalInfo/PersonalInfo'
import Visualization2d from './pages/Visualization2d/visualization2d'
import NiiViewer from './pages/Visualization3d/NiftiViewer'
import Security from './pages/Security/Security'
import PrevUploads from './pages/PreviousUploads/PrevUploads'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home/Home'
import Features from './pages/Features/Features'
import About from './pages/About/About'
import Faq from './pages/Faq/Faq'
import FeedbackForm from './pages/Feedback/Feeback'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<NavbarLayout children={<Home />} />} />
      <Route path="login" element={<NavbarLayout children={<Login />} />} />
      <Route path="signup" element={<NavbarLayout children={<Signup />} />} />
      <Route
        path="features"
        element={<NavbarLayout children={<Features />} />}
      />
      <Route path="about" element={<NavbarLayout children={<About />} />} />
      <Route path="faqs" element={<NavbarLayout children={<Faq />} />} />
      <Route
        path="feedback"
        element={<NavbarLayout children={<FeedbackForm />} />}
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="segmant2d"
          element={<SidebarLayout children={<Segmant2d />} />}
        />
        <Route
          path="segmant3d"
          element={<SidebarLayout children={<Segmant3d />} />}
        />
        <Route
          path="dashboard"
          element={<SidebarLayout children={<PersonalInfo />} />}
        />
        <Route
          path="visualize2d"
          element={<SidebarLayout children={<Visualization2d />} />}
        />
        <Route
          path="visualize3d"
          element={<SidebarLayout children={<NiiViewer />} />}
        />
        <Route
          path="security"
          element={<SidebarLayout children={<Security />} />}
        />
        <Route
          path="previousuploads"
          element={<SidebarLayout children={<PrevUploads />} />}
        />
      </Route>
      <Route
        path="*"
        element={<NavbarLayout children={<div>404 Not Found</div>} />}
      />
    </Routes>
  )
}

export default App
