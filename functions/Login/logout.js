export default async function logout(){
   console.log("starting logout")
   const resp = await fetch('http://localhost:8080/loginREST/logout.json',{
       method: 'GET',
       credentials: 'include',
   })
   const result =await resp.json()
    if(result.status==200){
        return true
    } else {
        return false
    }
}