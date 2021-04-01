export default async function updateDepartment(departmentID,newDepartmentName){
    const res = await fetch(`http://localhost:8080/DepartmentsREST/updateDepartment.json?departmentID=${departmentID}&newName=${newDepartmentName}`,{method:'POST',credentials:'include'});
    const resp = await res.json()
    return {props: {resp}}
}