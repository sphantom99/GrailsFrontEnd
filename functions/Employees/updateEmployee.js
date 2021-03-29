export default async function updateEmployee(employeeID,firstName, lastName, afm, dobYear, dobMonth, dobDay, department){
    const resp = await fetch(`http://localhost:8080/EmployeesREST/updateEmployee.json?ID=${employeeID}&firstName=${firstName}&lastName=${lastName}&afm=${afm}&dobYear=${dobYear}&dobMonth=${dobMonth}&dobDay=${dobDay}&department=${department}`)
    const result = await resp.json()
    if(result.status==200){
        return result
    } else {
        console.log(result.message)
    }
}