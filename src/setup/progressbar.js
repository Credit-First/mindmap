import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import TopBarProgress from "react-topbar-progress-indicator"

TopBarProgress.config({
   barColors: {
      "0": "rgb(247 87 140)",
      "0.5": "rgb(247 87 140)",
      "1.0": "rgb(247 87 140)",
   },
   shadowBlur: 5
});

const ProgressBar = ({ children }) => {
   const [progress, setProgress] = useState(false)
   const [prevLoc, setPrevLoc] = useState("")
   const location = useLocation()

   useEffect(() => {
      setProgress(false)
   }, [prevLoc])
   
   useEffect(() => {
      setPrevLoc(location.pathname)
      setProgress(true)
      if (location.pathname === prevLoc) {
         setPrevLoc('')
      }
   }, [location])

   return (
      <>
         {progress && <TopBarProgress color="#f11946" />}
         {children}
      </>
   )
}

export default ProgressBar