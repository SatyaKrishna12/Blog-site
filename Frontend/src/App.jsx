import { Route, Routes } from 'react-router-dom'
import { BlogHome } from './Pages/BlogHome'
import Navbar from './components/Navbar'
import { BlogPost } from './Pages/BlogPost'
import NotFound from './Pages/NotFound'
import { AdminDashboard } from './Pages/admin/AdminDashboard'
import { CreatePost } from './Pages/admin/CreatePost'
import { EditPost } from './Pages/admin/EditPost'
import { Login } from './Pages/Login'
import { Register } from './Pages/Register'
import { About } from './Pages/About'
import { Contact } from './Pages/Contact'
import { AdminRoute } from './components/ProtectedRoute'

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route  path="/" element={<BlogHome/>} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/admin' element={
          <AdminRoute>
            <AdminDashboard/>
          </AdminRoute>
        } />
        <Route path='/admin/create' element={
          <AdminRoute>
            <CreatePost/>
          </AdminRoute>
        } />
        <Route path='/admin/edit/:slug' element={
          <AdminRoute>
            <EditPost/>
          </AdminRoute>
        } />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
