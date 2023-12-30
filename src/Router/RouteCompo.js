import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeComponent from '../UI_Component/HomeComponent'
import UserLogIn from '../UI_Component/userAuthorization/UserLogIn'


function RouteCompo() {
  return (
    <Routes>
        <Route path='/' element={ <HomeComponent/>} />
        <Route path='/login' element={ <UserLogIn/>} />
    </Routes>
  )
}

export default RouteCompo
