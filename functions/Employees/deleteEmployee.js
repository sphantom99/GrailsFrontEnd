export default async function deleteEmployee(employeeID) {
    const formData = new FormData()
    formData.append('ID', employeeID)
    const resp = await fetch(`http://localhost:8080/EmployeesREST/deleteEmployee.json`, {
        method: 'DELETE',
        credentials: 'include',
        body: formData,
    });

    const response = await resp.json()

    if (response.status == 200) {
        return true
    } else if (response.status == 500) {
        console.log(response.message)
        return false
    }


}