export async function getAllEmployees(department) {
    try {
        const formData = new FormData();
        formData.append('departmentID', department)
        const res = await fetch(`http://localhost:8080/DepartmentsREST/getEmployees.json`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const response = await res.json()
        if (response.status == 200) {
            return response.employees
        } else if (response.status == 500) {
            console.log(response.message)
            return false
        }
    } catch (error){
        console.error(error);
    }
    
}