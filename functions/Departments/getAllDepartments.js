export async function getAllDepartments() {
    try {
        const res = await fetch('http://localhost:8080/DepartmentsREST/getAllDepartments.json',{credentials:'include'});
        const departments = await res.json()
        if(departments.status==200){
            return departments.departments
        } else if (departments.status==500){
            return false
        }
    } catch (error){
        console.error(error);
    }
    
}