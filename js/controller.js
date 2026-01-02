//Objecto de gestão da data da task
const task = {
    /* Data Total de Tasks */
    dataTask:[],
    /* Data das Task Pendings */
    dataPending: [],
    /* Data das Task Completed */
    dataCompleted: [],

    /* OnRedy do objecto, vai buscar a localStorage dataTask e seta a data Task */
    onReady() {
        if(this.validationLocalStorage()) {
            this.dataTask = JSON.parse(localStorage.getItem('dataTask'))
        }
    },

    /* Metodo de inicio da Task */
    init() {
        /* Cria e filtra a dataTask para Criar as listas da dataPending e dataCompleted */
        this.dataPending = this.dataTask.map((obj) => ({id:obj.id,task:obj.task,isCompleted:obj.isCompleted})).filter(obj => obj.isCompleted === false)
        this.dataCompleted = this.dataTask.map((obj) => ({id:obj.id,task:obj.task,isCompleted:obj.isCompleted})).filter(obj => obj.isCompleted === true)
        if(this.validationDataTask()) {
            /* Grava na local storage */
            localStorage.setItem('dataTask', JSON.stringify(this.dataTask))
        } else {
            /* apaga a local storage */
            localStorage.removeItem('dataTask')
            console.error('Erro ao gravar na localStorage')
        }
    },
    /* Cria uma Task, calculando o seu Id, criando um objecto Task e adicionando á lista dataTask */
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
    /* Apaga uma Task da dataTask */
    deleteTask(obj) {
        const data = this.dataTask.filter(item => item.id === obj.id && item.task === obj.task)
        const index = this.dataTask.indexOf(data[0])
        this.dataTask.splice(index, 1)
        this.init()
    },
    /* Atualiza uma Task */
    updatedTask(obj) {
        const data = this.dataTask.filter(item => item.id === obj.id)
        const index = this.dataTask.indexOf(data[0])
        this.dataTask[index].isCompleted = true
        this.init()
    },
    /* valida a dataTask antes de a gravar na local storage */
    validationDataTask() {
        var isvalid = true
        /* 
        verifica se a dataTask:
        1. é um Array
        2. o Id é um numero
        3. o atributo task é um texto
        4. isCompleted é booleano
         */
        if(!Array.isArray(this.dataTask) && this.dataTask.every(obj => typeof obj.id !== 'number' || typeof obj.task !== 'string' || typeof obj.isCompleted != 'boolean')) {
            isvalid = false
        }
        /* verifica se todos os id estt]ao preenchidos */
        const idPreenchido = this.dataTask.filter(obj => obj.id <= 0)
        if(idPreenchido.length != 0) {
            isvalid = false
        }

        /* Verifica se todas as tasks est]ao preenchidas */
        const taskPreenchido = this.dataTask.filter(obj => obj.task.trim() === '')
        if(taskPreenchido.length != 0) {
            isvalid = false
        }
    
        return isvalid
    
    },
    /* Valida se a local storage dataTask esta valida */
    validationLocalStorage() {
        try {
            const raw = localStorage.getItem('dataTask')
          
            if (raw) {
              const parsed = JSON.parse(raw)
                /* 
                verifica se a dataTask:
                1. é um Array
                2. o Id é um numero
                3. o atributo task é um texto
                4. isCompleted é booleano
                */
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
        /* Cria div pai do item */ 
        const item = document.createElement('div')
        /* adiciona css */
        item.classList.add('display-flex','gap-xs','align-items-center')
        /* adiciona tabindex */
        item.setAttribute('tabindex', '0')
        /* adiciona eventos UX */
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
    
        /* adiciona radio button */
        const radio = document.createElement('div')
        /* adiciona css */
        radio.classList.add('circulo')
    
        /* aiciona evento */
        radio.addEventListener('click', () => {
            task.updatedTask(obj)
            createMessague('Task terminada com sucessso','sucess')
            callback()
        })
    
        /* adiciona nome da task */
        const itemName = document.createElement('span')
        itemName.classList.add('flex1')
        itemName.innerText = obj.task
        itemName.addEventListener('click', () => {
            task.updatedTask(obj)
            createMessague('Task terminada com sucessso','sucess')
            callback()
        })
    
        /* diciona icon eliminar a task */
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
            taskPending.classList.remove('not-visible')
            
        } else {
            tagPending.classList.add('is-active')
            tagPending.blur()
            taskPending.classList.add('not-visible')
        }
        this.all()
    },
    completed() {
        if(tagCompleted.classList.contains('is-active')) {
            tagCompleted.classList.remove('is-active')
            tagCompleted.blur()
            taskCompleted.classList.remove('not-visible')
        } else {
            tagCompleted.classList.add('is-active')
            tagCompleted.blur()
            taskCompleted.classList.add('not-visible')
        }
        this.all()
    },
    all() {

        if(taskPending.classList.contains('not-visible') && taskCompleted.classList.contains('not-visible')) {
            taskNotSelected.classList.remove('not-visible')
        } else {
            taskNotSelected.classList.add('not-visible')
        }
    }
}