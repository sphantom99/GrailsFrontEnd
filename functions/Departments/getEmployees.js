export async function getAllEmployees(department) {
    
    const formData = new FormData();
    formData.append('departmentName',department)
    const res = await fetch(`http://localhost:8080/DepartmentsREST/getEmployees.json?departmentName=${department}`,
    {method:'POST',credentials:'include'});
    const employees = await res.json()
    console.log(employees)
    return employees
}