import { Navigate } from "react-router-dom"
import { api, CurrentToken, getRole } from '../helper/helper'
import { useEffect, useState } from "react"

const AuthMiddleware = (props) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const authCheck = async () => {
    try {
      const res = await api.get('/user')
      setUser(res.data)

      // selalu update role sesuai server
      if (res.data?.role?.name !== getRole.get()) {
        getRole.set(res.data.role.name)
      }

      return true
    } catch (err) {
      console.log(err.response?.data.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    authCheck()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  // kalau gagal auth → logout
  if (!user) {
    CurrentToken.remove()
    getRole.remove()
    return <Navigate to={'/login'} />
  }

  return props.children
}

export default AuthMiddleware
