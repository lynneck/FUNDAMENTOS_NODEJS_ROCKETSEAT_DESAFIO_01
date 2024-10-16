import fs from 'node:fs/promises'

const databasePath = new URL('./dbTasks.json', import.meta.url)

//console.log(databasePath);


export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persit()
            })
    }

    #persit() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }
    

    select(table) {
        const data = this.#database[table] ?? []
        
        return data
       
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persit()

        return data;


    }
    update(table, id, data,) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            const row = this.#database[table][rowIndex]
            this.#database[table][rowIndex] = { id, ...row, ...data, }
            this.#persit()
        }
    }
    
    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persit()
        }
    }



}