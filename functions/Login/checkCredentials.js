import cookieCutter from 'cookie-cutter'
export default async function checkCredentials(username, password) {
    try {
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        const resp = await fetch('http://localhost:8080/loginREST/login.json', {
            method: 'POST',
            credentials: 'include',
            body: formData,
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