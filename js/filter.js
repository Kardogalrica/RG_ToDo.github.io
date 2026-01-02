//Filtros

const tagPending = document.querySelector('#tag-pending')

const taskPending = document.querySelector('#task-pending')

const tagCompleted = document.querySelector('#tag-completed')

const taskCompleted = document.querySelector('#task-completed')

const taskNotSelected = document.querySelector('#taskNotSelected')

/* Adição de Eventos ao Pending */
/* Ao clicar na tag */
tagPending.addEventListener('click', () => {
    toggleTask.pending()
})
/* Ao presionar ENTER sobre a Tag */
tagPending.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault()
        toggleTask.pending()
    }

})

/* Ao clicar na tag */
tagCompleted.addEventListener('click', () => {
    toggleTask.completed()
})

/* Ao presionar ENTER sobre a Tag */
tagCompleted.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault()
        toggleTask.completed()
    }

})