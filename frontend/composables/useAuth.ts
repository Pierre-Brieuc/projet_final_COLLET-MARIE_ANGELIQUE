export const useAuth = () => {
    const register = async (username: string, password: string) => {
        const resp = await fetch('http://localhost:5000/users/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        return resp;
    }

    const logout = async () => {
        const jwt = useCookie('jwt');
        jwt.value = null;
    }

    const login = async (username: string, password: string) => {
        const resp = await fetch('http://localhost:5000/users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        return resp;
    }

    return {
        register,
        logout,
        login
    }
}
