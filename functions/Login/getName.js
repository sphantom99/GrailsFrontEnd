export default async function getName(){
    const resp = await fetch('http://localhost:8080/loginREST/getUsername.json',{
        method: 'GET',
        credentials: 'include'
    })
    const result = await resp.json()
    if (result.status==200){
        return result.username
    } else {
        return false
    }
}