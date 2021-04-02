export async function addDepartment(departmentName){
    
    const res = await fetch(`http://localhost:8080/DepartmentsREST/addDepartment.json?departmentName=${departmentName}`,{method: 'POST',credentials: 'include'})
    const resp = await res.json()
    if(resp.status == 200){
        return true
    } else if (resp.status == 500){
        console.log(resp.message)
        return false
    }
}