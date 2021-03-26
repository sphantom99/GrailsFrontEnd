export async function deleteDepartment(departmentName) {
    const res = await fetch(`http://localhost:8080/DepartmentsREST/deleteDepartment.json?departmentName=${departmentName}`);
    const departments = await res.json()
    console.log(departments)
    return {props: {departments}}
}