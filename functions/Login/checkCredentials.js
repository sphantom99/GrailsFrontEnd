import cookieCutter from 'cookie-cutter'
export default async function checkCredentials(username,password){
    const formData = new FormData()
    formData.append('username',username)
    formData.append('password',password)
    const resp = await fetch('http://localhost:8080/loginREST/login.json',{
        method: 'POST',
        credentials: 'include',
        body: formData
    })
   const result = await resp.json()
   console.log(result)
    if(result.status==200){
        return true
    } else {
        return false
    }
}