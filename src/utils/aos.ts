"use client"

import Aos from 'aos'
import React, { useEffect } from 'react'
import "aos/dist/aos.css"

const AOSInit: React.FC = () => {
    useEffect(() => {
        Aos.init()
    }, [])

  return null
}

export default AOSInit
