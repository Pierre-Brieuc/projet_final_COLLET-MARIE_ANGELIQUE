<script setup>
definePageMeta({
        title:'Home Page',
        description:'Manage your todo-list',
        middleware:['user-restricted']
})

const variables = reactive({
    newTitle:'',
    newDetails:'',
    newStatus:false
})

const jwt= useCookie('jwt')

const {data: todos} = await useFetch('http://localhost:5000/todo',{
    headers:{
        Authorization:`Bearer ${jwt.value}`
    }
})

const addTodo = async () => {
    const resp = await fetch('http://localhost:5000/todo',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${jwt.value}`
        },
        body:JSON.stringify({
            details: variables.newTodo,
            title: variables.newDetails,
            creationDate: new Date(),
            isDone: variables.newStatus
        })
    })
    if(resp.ok){
        const newTask = await resp.json()
        todos.push(newTask)
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
        todos.splice(todos.findIndex(todo => todo.id === id), 1)
    }
    else{
        alert('Error while removing todo')
    }
}

</script>



<template>
    <div>
        <h1>Welcome! Here is your current todo-list :</h1>
        <div>
            <label for="newTitle">Title of new task</label>
            <input type="text" id="newTitle" v-model="variables.newTodo"  />
            <label for="newDetails">Details of new task</label>
            <input type="text" id="newDetails" v-model="variables.newDetails" />
            <button @click="addTodo">Add</button>
        </div>
        <div>
            <ul>
                <li v-for="todo in todos">
                    <span>{{ todo.title }} : {{ todo.details }}</span>
                    <button @click="removeTodo(todo._id)">Remove</button>
                </li>
            </ul>
        </div>
    </div>
</template>