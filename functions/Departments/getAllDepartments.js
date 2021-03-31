export async function getAllDepartments() {
    const res = await fetch('http://localhost:8080/DepartmentsREST/getAllDepartments.json',{credentials:'include'});
    const departments = await res.json()
    //console.log(departments)
    return departments
}