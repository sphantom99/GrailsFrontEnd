export async function deleteDepartment(departmentID) {
    try {
        const formData = new FormData()
        formData.append('departmentID', departmentID)
        const res = await fetch(`http://localhost:8080/DepartmentsREST/deleteDepartment.json`, {
            method: 'DELETE',
            credentials: 'include',
            body: formData
        });
        const response = await res.json()
        if (response.status == 200) {
            return true
        } else if (response.status == 500) {
            console.log(response.message)
            return false
        }
    } catch (error) {
        console.error(error);
    }

}