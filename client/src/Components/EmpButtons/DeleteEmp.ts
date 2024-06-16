export default async function DeleteEmp(empids: number[]) {
  try {
    const response = await fetch("http://localhost:3000/api/empdelete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ empids }),
    })

    if (!response.ok && response.status === 500) {
      throw new Error(`ERROR: ${response.status}`)
    }

    const data = await response.json()
    return data // return the data to EmpTable.tsx
  } catch (error) {
    console.error("Something went wrong: ", error)
  }
}
