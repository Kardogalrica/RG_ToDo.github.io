//Objecto de gestão da data da task
const task = {
    dataTask:[],
    dataPending: [],
    dataCompleted: [],
    onReady() {
        if(this.validationLocalStorage()) {
            this.dataTask = JSON.parse(localStorage.getItem('dataTask'))
        }
    },
    init() {
        this.dataPending = this.dataTask.map((obj) => ({id:obj.id,task:obj.task,isCompleted:obj.isCompleted})).filter(obj => obj.isCompleted === false)
        this.dataCompleted = this.dataTask.map((obj) => ({id:obj.id,task:obj.task,isCompleted:obj.isCompleted})).filter(obj => obj.isCompleted === true)
        if(this.validationDataTask()) {
            localStorage.setItem('dataTask', JSON.stringify(this.dataTask))
        } else {
            localStorage.removeItem('dataTask')
            console.error('Erro ao gravar na localStorage')
        }
    },
    createTask(value) {
        var lastId = 0 
        if(this.dataTask.length > 0) {
            lastId = this.dataTask[this.dataTask.length - 1].id + 1 
        } else {
            lastId = 1
        }
        const task = {
            id:lastId,
            task:value,
            isCompleted:false
        }
    
        this.dataTask.push(task)    
        this.init()
    },
    deleteTask(obj) {
        const data = this.dataTask.filter(item => item.id === obj.id && item.task === obj.task)
        const index = this.dataTask.indexOf(data[0])
        this.dataTask.splice(index, 1)
        this.init()
    },
    updatedTask(obj) {
        const data = this.dataTask.filter(item => item.id === obj.id)
        const index = this.dataTask.indexOf(data[0])
        this.dataTask[index].isCompleted = true
        this.init()
    },
    validationDataTask() {
        var isvalid = true
    
        if(!Array.isArray(this.dataTask) && this.dataTask.every(obj => typeof obj.id !== 'number' || typeof obj.task !== 'string' || typeof obj.isCompleted != 'boolean')) {
            isvalid = false
        }
    
        const idPreenchido = this.dataTask.filter(obj => obj.id <= 0)
    
        if(idPreenchido.length != 0) {
            isvalid = false
        }
    
        const taskPreenchido = this.dataTask.filter(obj => obj.task.trim() === '')
    
        if(taskPreenchido.length != 0) {
            isvalid = false
        }
    
        return isvalid
    
    },
    validationLocalStorage() {
        try {
            const raw = localStorage.getItem('dataTask')
          
            if (raw) {
              const parsed = JSON.parse(raw)
        
              if (Array.isArray(parsed) && parsed.every(t => typeof t.id === 'number' && typeof t.task === 'string' && typeof t.isCompleted === 'boolean')) {
                return true
              } else {
                console.warn("Dados no localStorage não são um array. Resetado.")
                localStorage.removeItem('dataTask')
                return false
              }
            }
          } catch (e) {
            console.error("Erro ao fazer parse dos dados:", e)
            localStorage.removeItem('dataTask')
            return false
          }
    },
}

//Objecto de gestão da UI das task
const createItem = {
    pending(obj,callback) {    
        const item = document.createElement('div')
        item.classList.add('display-flex','gap-xs','align-items-center')
        item.setAttribute('tabindex', '0')

        item.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                e.preventDefault()
                task.updatedTask(obj)
                createMessague('Task terminada com sucessso','sucess')
                callback()
            }
            if(e.altKey && e.ctrlKey && e.key === 'd') {
                if(confirm('Tem a certeza que pretende apagar a Task '+obj.task+'?')) {
                    task.deleteTask(obj)
                    createMessague('Task apagada com sucesso','sucess')
                    callback()
                }
            }
        })
    
        const radio = document.createElement('div')
        radio.classList.add('circulo')
    
        radio.addEventListener('click', () => {
            task.updatedTask(obj)
            createMessague('Task terminada com sucessso','sucess')
            callback()
        })
    
        const itemName = document.createElement('span')
        itemName.classList.add('flex1')
        itemName.innerText = obj.task
        itemName.addEventListener('click', () => {
            task.updatedTask(obj)
            createMessague('Task terminada com sucessso','sucess')
            callback()
        })
    
        const trash = document.createElement('i')
        trash.classList.add('fas','fa-trash')
        trash.addEventListener('click', () => {
            if(confirm('Tem a certeza que pretende apagar a Task '+obj.task+'?')) {
                task.deleteTask(obj)
                createMessague('Task apagada com sucesso','sucess')
                callback()
            }
        })
    
        item.appendChild(radio)
        item.appendChild(itemName)
        item.appendChild(trash)
    
        return item
    },
    completed(obj,callback) {
        const item = document.createElement('div')
        item.classList.add('display-flex','gap-xs','align-items-center')
        item.setAttribute('tabindex', '0')

        item.addEventListener('keydown', (e) => {
            if(e.altKey && e.ctrlKey && e.key === 'd') {
                if(confirm('Tem a certeza que pretende apagar a Task '+obj.task+'?')) {
                   task.deleteTask(obj)
                   createMessague('Task apagada com sucesso','sucess')
                   callback()
                }
            }
        })
    
        const check = document.createElement('i')
        check.classList.add('fa','fa-thin','fa-circle-check','text-success')
    
        const itemName = document.createElement('span')
        itemName.classList.add('flex1')
        itemName.innerText = obj.task
    
        const trash = document.createElement('i')
        trash.classList.add('fas','fa-trash')
        trash.addEventListener('click', () => {
            if(confirm('Tem a certeza que pretende apagar a Task '+obj.task+'?')) {
                task.deleteTask(obj)
                createMessague('Task apagada com sucesso','sucess')
                callback()  
            }
        })
    
        item.appendChild(check)
        item.appendChild(itemName)
        item.appendChild(trash)
    
        return item
    }, 
}

//Controla os filtros por Task
const toggleTask = {
    pending() {
        if(tagPending.classList.contains('is-active')) {
            tagPending.classList.remove('is-active')
            tagPending.blur()
            taskPending.classList.add('not-visible')
            
        } else {
            tagPending.classList.add('is-active')
            tagPending.blur()
            taskPending.classList.remove('not-visible')
        }
    },
    completed() {
        if(tagCompleted.classList.contains('is-active')) {
            tagCompleted.classList.remove('is-active')
            tagCompleted.blur()
            taskCompleted.classList.add('not-visible')
        } else {
            tagCompleted.classList.add('is-active')
            tagCompleted.blur()
            taskCompleted.classList.remove('not-visible')
        }
    }
}