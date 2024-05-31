import { useState, useEffect, useMemo } from "react"

const Employee = () => {
  useEffect(() => {
    async function getEmpDetails() {
      const response = await fetch("http://localhost:3000/api/emp", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      console.log(data)
    }
    
    getEmpDetails()
  }, [])

  return <div>Employee</div>
}

export default Employee
