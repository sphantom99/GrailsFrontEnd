export default async function deleteEmployee(employeeID){
    const res = await fetch(`http://localhost:8080/EmployeesREST/deleteEmployee.json?ID=${employeeID}`);
    const departments = await res.json()
    console.log(departments)
    return {props: {departments}}
}