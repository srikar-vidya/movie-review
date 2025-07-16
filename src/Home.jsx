import React, { useContext } from 'react'
import { useGlobalContext } from './Context'
import Movies from './Movies'
import Search from './Search'

const Home = () => {
    const hi=useGlobalContext()
  return (
    <div>
      <Search/>
    <Movies/>
    {/* <AIsearch/> */}
    
    </div>
    
  )
}

export default Home