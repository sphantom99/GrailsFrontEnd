export async function deleteDepartment(departmentID) {
    const formData = new FormData()
    formData.append('departmentID',departmentID)
    const res = await fetch(`http://localhost:8080/DepartmentsREST/deleteDepartment.json`,
    {method:'POST',credentials:'include',body: formData});
    const departments = await res.json()
    console.log(departments)
    return {props: {departments}}
}