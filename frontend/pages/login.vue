<script setup>
    definePageMeta({
        title:'Login',
        description:'Login to your account',
        middleware:['not-logged-restricted']
    })
    const {login} = useAuth()
    const variables = reactive({
        username:'',
        password:''
    })
    const authToken = useCookie('jwt', {maxAge:1800})
    async function onLogin(){
        const res = await login(variables.username, variables.password)
        if(res.ok){
            const {jwt} = await res.json()
            authToken.value = jwt
            onValidLogin()
        }
        else{
            alert('Invalid login');
        }
    }
    async function onValidLogin(){
        await navigateTo('/')
    }

</script>

<template>
    <div>
        <form @submit.prevent="onLogin">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="variables.username" />
            
            <label for="password">Password</label>
            <input type="password" id="password" v-model="variables.password" />

            <button type="submit">Login</button>
        </form>
        <div>
            No account yet? <NuxtLink to="/register">Register</NuxtLink>
        </div>
    </div>
</template>