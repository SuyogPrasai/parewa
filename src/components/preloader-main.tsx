// components/Preloader.js
import React from 'react'

const Preloader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
      {/* You can use a simple spinner or a more complex animation */}
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
      {/* Optional: Add text */}
      {/* <p className="ml-4 text-lg text-gray-700">Loading...</p> */}
    </div>
  )
}

export default Preloader