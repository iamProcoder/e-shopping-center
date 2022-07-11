import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'


const Home = () => {
  return (
    <>
        <Header />
        <Outlet />
    </>
  )
}

export default Home