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
    const resp = await res.json()
    if(resp.status==200){
        return {props: {resp}}
    }
}