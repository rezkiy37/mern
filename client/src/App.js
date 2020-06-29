import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hooks'
import { AuthContext } from './context/authContext'
import { Navbar } from './components/Navbar'
import Loader from './components/Loader'
import 'materialize-css'

function App() {

  const { login, logout, token, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <Router>
      <AuthContext.Provider value={{
        login, logout, token, userId, isAuthenticated
      }}>
        {isAuthenticated && <Navbar />}
        <div className="container">
          {routes}
        </div>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
