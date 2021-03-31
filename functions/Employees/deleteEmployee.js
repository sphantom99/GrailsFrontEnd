export default async function deleteEmployee(employeeID){
    const formData = new FormData()
    formData.append('ID',employeeID)
    const resp = await fetch(`http://localhost:8080/EmployeesREST/deleteEmployee.json`,{
        method: 'DELETE',
        credentials: 'include',
        body: formData,
    });
    const result = await resp.json()
    /*
    if(result.status==200){
        return true
    } else {
        return false
    }*/
    return true
    
}