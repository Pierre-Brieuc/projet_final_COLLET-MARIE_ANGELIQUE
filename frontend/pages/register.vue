<script setup>
    definePageMeta({
        title:'Register',
        description:'Register your account',
        middleware:['not-logged-restricted']
    })
    const {register} = useAuth()
    const variables = reactive({
        username:'',
        password:''
    })
    const authToken = useCookie('jwt', {maxAge:1800})

    async function onRegister(){
        const res = await register(variables.username, variables.password)
        if(res.ok){
            const {jwt} = await res.json()
            authToken.value = jwt
            onValidRegister();
        }
        else{
            alert('Username already taken');
        }
    }

    async function onValidRegister(){
        await navigateTo('/login')
    }
</script>

<template>
    <div>
        <form @submit.prevent="onRegister">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="variables.username" />
            
            <label for="password">Password</label>
            <input type="password" id="password" v-model="variables.password" />

            <button type="submit">Login</button>
        </form>
        
    </div>    
</template>