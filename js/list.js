// Getão Task
const listaPending = document.querySelector('#list-pending')

const listaCompleted = document.querySelector('#list-completed')

const btnInput = document.querySelector('#addTask')

const input = document.querySelector('#newTask')

const errorInput = document.querySelector('#error-messague')


//Renderização das listas
const renderLista = () => {  
    /* verifica se a lista pending está vazia */
    if(task.dataPending.length === 0) {
       listaPending.classList.add('list-enpty') 
    } else {
        listaPending.classList.remove('list-enpty') 
    }

    /* Adiciona elementos á lista enpty */
    listaPending.innerHTML = ''
    task.dataPending.forEach((item) => {
    listaPending.appendChild(createItem.pending(item,() => {renderLista()}))
    })

    /* verifica se a lista Completed está vazia */
    if(task.dataCompleted.length === 0) {
       listaCompleted.classList.add('list-enpty') 
    } else {
        listaCompleted.classList.remove('list-enpty') 
    }

    /* Adiciona elementos á lista completed */
    listaCompleted.innerHTML = ''
    task.dataCompleted.forEach((item) => {
        listaCompleted.appendChild(createItem.completed(item,() => {renderLista()}))
    })
}

//Inicialização das tasks
task.onReady()
task.init()
renderLista()


btnInput.addEventListener('click', (e) => {
    e.preventDefault()
    errorInput.innerText = ''
    if(!input.value || input.value.trim() === '') {
        errorInput.innerText = 'Campo Obrigatório!'
        return
    }

    const data = task.dataTask.filter(item => item.task === input.value)

    if(data.length != 0) {
        errorInput.innerText = 'Já existe uma task na lista!'
        return
    }

    task.createTask(input.value)
    createMessague('Task criada com sucessso','sucess')
    renderLista()

    input.value = ''
})