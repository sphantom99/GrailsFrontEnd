export default async function logout() {
    try {
        const resp = await fetch('http://localhost:8080/loginREST/logout.json', {
            method: 'GET',
            credentials: 'include',
        })
        const response = await resp.json()
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