export async function addDepartment(departmentName) {
    try {
        const res = await fetch(`http://localhost:8080/DepartmentsREST/addDepartment.json?departmentName=${departmentName}`, { method: 'POST', credentials: 'include' })
        const resp = await res.json()
        return resp
    } catch (error) {
        console.error(error)
        return resp
    }

}