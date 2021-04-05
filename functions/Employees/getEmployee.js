export default async function getEmployee(employeeID) {
    try {
        const formData = new FormData()
        formData.append("ID", employeeID)
        const resp = await fetch(`http://localhost:8080/EmployeesREST/getEmployee.json`, {
            credentials: 'include',
            body: formData
        })
        const response = await resp.json()

        if (response.status == 200) {
            return response.employeeData
        } else if (response.status == 404) {
            console.log(response.message)
            return false
        } else if (response.status == 500) {
            console.log(response.message)
            return false
        }
    } catch (error) {
        console.error(error);
    }

}