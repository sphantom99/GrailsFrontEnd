export async function getAllEmployees(department) {
    const res = await fetch(`http://localhost:8080/DepartmentsREST/getEmployees.json?departmentName=`+department);
    const employees = await res.json()
    console.log(employees)
    return {props: {employees}}
}