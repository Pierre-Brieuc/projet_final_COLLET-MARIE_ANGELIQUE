<script setup>
definePageMeta({
        title:'Home Page',
        description:'Manage your todo-list',
        middleware:['user-restricted']
})
const {logout} = useAuth()

const variables = reactive({
    newTitle:'',
    newDetails:'',
    newStatus:false
})
const onLogout = async () => {
    await logout()
    await navigateTo('/login')
}

const refreshing = ref(false)

const jwt= useCookie('jwt')


const {data: todos} = await useFetch('http://localhost:5000/todo',{
    headers:{
        Authorization:`Bearer ${jwt.value}`
    }
})

const refreshAll = async () => {
    refreshing.value = true
    try {
        await refreshNuxtData()
    } finally {
        refreshing.value = false
    }
}

const addTodo = async () => {
    const resp = await fetch('http://localhost:5000/todo',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${jwt.value}`
        },
        body:JSON.stringify({
            details: variables.newDetails,
            title: variables.newTitle,
            creationDate: new Date(),
            isDone: variables.newStatus
        })
    })
    if(resp.ok){
        //const newTask = await resp.json()
        refreshAll();
    }
    else{
        alert('Error while adding todo')
    }
}

const removeTodo = async (id) => {
    const resp = await fetch(`http://localhost:5000/todo/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${jwt.value}`
        }
    })
    if(resp.ok){
        //todos.splice(todos.findIndex(todo => todo.id === id), 1)
        refreshAll();
    }
    else{
        alert('Error while removing todo')
    }
}

</script>



<template>
    <div>
        <button @click="onLogout">Logout</button>
        <h1>Welcome! Here is your current todo-list :</h1>
        <div>
            <label for="newTitle">Title of new task</label>
            <input type="text" id="newTitle" v-model="variables.newTitle"  />
            <label for="newDetails">Details of new task</label>
            <input type="text" id="newDetails" v-model="variables.newDetails" />
            <button @click="addTodo">Add</button>
        </div>
        <div>
            <button :disabled="refreshing" @click="refreshAll"> Refresh the list </button>
            <ul>
                <li v-for="todo in todos">
                    <span>{{ todo.title }} : {{ todo.details }}</span>
                    <button @click="removeTodo(todo._id)">Remove</button>
                </li>
            </ul>
        </div>
    </div>
</template>