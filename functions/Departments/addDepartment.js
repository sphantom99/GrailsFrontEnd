export async function addDepartment(departmentName){
    console.log(departmentName)
    const res = await fetch(`http://localhost:8080/DepartmentsREST/addDepartment.json?departmentName=${departmentName}`)
    const resp = await res.json()
    return resp
}