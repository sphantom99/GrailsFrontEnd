export default async function addEmployee(firstName,lastName,AFM,dobYear,dobMonth,dobDay,department){
    console.log(firstName,lastName,dobYear,dobMonth,dobDay,department)
    const formData = new FormData()
    formData.append('firstName',firstName)
    formData.append('lastName',lastName)
    formData.append('afm',AFM)
    formData.append('dobYear',dobYear)
    formData.append('dobMonth',dobMonth)
    formData.append('dobDay',dobDay)
    formData.append('department',department)
    const res = await fetch(`http://localhost:8080/EmployeesREST/addEmployee.json`,{
        method: 'POST',
        credentials: 'include',
        body: formData
    })
    const response = await res.json()
    if(response.status==200){
        return true
    } else if (response.status==500){
        console.log(response.message)
        return false
    }
}