export default async function addEmployee(firstName,lastName,AFM,dobYear,dobMonth,dobDay,department){
    console.log(firstName,lastName,dobYear,dobMonth,dobDay,department)
    const res = await fetch(`http://localhost:8080/EmployeesREST/addEmployee.json?firstName=${firstName}&lastName=${lastName}&afm=${AFM}&dobYear=${dobYear}&dobMonth=${dobMonth}&dobDay=${dobDay}&department=${department}`)
    const resp = await res.json()
    if(resp.status==200){
        return {props: {resp}}
    }
}