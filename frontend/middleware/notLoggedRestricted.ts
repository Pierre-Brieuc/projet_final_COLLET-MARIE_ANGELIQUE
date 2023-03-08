export default defineNuxtRouteMiddleware(async (_to, _from) => {
    const jwt = useCookie('jwt')
    if(jwt.value){
        return navigateTo('/')
    }
})