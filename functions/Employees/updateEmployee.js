import employee from "../../pages/employees/addEmployee"

export default async function updateEmployee(employeeIDVar,firstNameVar, lastNameVar, afmVar, dobYearVar, dobMonthVar, dobDayVar, departmentVar){
    const formData = new FormData()
    formData.append('ID',employeeIDVar)
    formData.append('firstName',firstNameVar)
    formData.append('lastName',lastNameVar)
    formData.append('afm',afmVar)
    formData.append('dobYear',dobYearVar)
    formData.append('dobMonth',dobMonthVar)
    formData.append('dobDay',dobDayVar)
    formData.append('department',departmentVar)
    console.log(employeeIDVar)
    console.log('^^^^^^^')
    const resp = await fetch(`http://localhost:8080/EmployeesREST/updateEmployee.json`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            'Accept':'application/json',
            'Conent-type':'application/json'
        },
        body: formData /*JSON.stringify({
            employeeID: employeeIDVar,
            firstName: firstNameVar,
            lastName: lastNameVar,
            afm: afmVar,
            dobYear: dobYearVar,
            dobMonth: dobMonthVar,
            dobDay: dobDayVar,
            department: departmentVar
        })*/
    })
    const result = await resp.json()
    if(result.status==200){
        return result
    } else {
        console.log(result.message)
    }
}