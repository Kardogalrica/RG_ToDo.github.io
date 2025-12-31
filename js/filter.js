//Filtros

const tagPending = document.querySelector('#tag-pending')

const taskPending = document.querySelector('#task-pending')

const tagCompleted = document.querySelector('#tag-completed')

const taskCompleted = document.querySelector('#task-completed')

tagPending.addEventListener('click', () => {
    toggleTask.pending()
})

tagPending.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault()
        toggleTask.pending()
    }

})

tagCompleted.addEventListener('click', () => {
    toggleTask.completed()
})

tagCompleted.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault()
        toggleTask.completed()
    }

})