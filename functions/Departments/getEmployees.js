export async function getAllEmployees(department) {
    
    const formData = new FormData();
    formData.append('departmentID',department)
    const res = await fetch(`http://localhost:8080/DepartmentsREST/getEmployees.json`,
    {method:'POST',credentials:'include',body:formData});
    const employees = await res.json()
    console.log(employees)
    return employees
}