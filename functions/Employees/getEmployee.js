export default async function getEmployee(employeeID){
    const resp = await fetch(`http://localhost:8080/EmployeesREST/getEmployee.json?ID=${employeeID}`,{credentials:'include'})
    const data = await resp.json()
    return data
}