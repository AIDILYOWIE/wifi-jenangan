import React from 'react'
import { getRole } from '../../../utils/helper/helper'
import Admin from './Admin'
import ClientArea from './ClientArea'

const Dashboard = () => {
  return (
    getRole.get() == 'admin' ? <Admin/> : <ClientArea/>
  )
}

export default Dashboard