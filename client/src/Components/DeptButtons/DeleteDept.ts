export default async function DeleteDept(selectedIds: number[]) {
  try {
    const response = await fetch("http://localhost:3000/api/deptdelete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deptIds: selectedIds }),
    })

    if (!response.ok) {
      throw new Error(`ERROR: ${response.status}`)
    }

    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    throw error
  }
}
