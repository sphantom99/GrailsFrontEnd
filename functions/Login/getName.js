export default async function getName() {
    try {
        const resp = await fetch('http://localhost:8080/loginREST/getUsername.json', {
            method: 'GET',
            credentials: 'include'
        })
        const response = await resp.json()
        if (response.status == 200) {
            return response.username
        } else if (response.status == 500) {
            console.log(response.message)
            return false
        } else if (response.status==401){
            console.log(response.message)
            return false
        }
    } catch (error) {
        console.error(error);
    }

}