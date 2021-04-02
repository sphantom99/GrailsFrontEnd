export default async function getEmployee(employeeID) {
    try {
        const resp = await fetch(`http://localhost:8080/EmployeesREST/getEmployee.json?ID=${employeeID}`, {
            credentials: 'include'
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