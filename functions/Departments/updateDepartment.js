export default async function updateDepartment(oldDepartmentName,newDepartmentName){
    const res = await fetch(`http://localhost:8080/DepartmentsREST/updateDepartment.json?oldName=${oldDepartmentName}&newName=${newDepartmentName}`);
    const resp = await res.json()
    return {props: {resp}}
}