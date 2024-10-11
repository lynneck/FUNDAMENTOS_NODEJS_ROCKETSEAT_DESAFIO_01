import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

const currentTime = new Date()
export const routes = [

    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks')
            return res.end(JSON.stringify(tasks))
        }
    },


    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body

            if (!title || '' || !description || '') {
                return res.writeHead(400).end(
                    JSON.stringify({ message: 'title or description are required' })
                )
            }
            
            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: currentTime.toLocaleString('pt-BR'),

            }

            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    },


    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const itemID = id
            const { title, description,  } = req.body

            if (!title || '' || !description || '') {
                return res.writeHead(400).end(
                    JSON.stringify({ message: 'title or description are required' })
                )
            }

            const [task] = database.select('tasks', { id })
            if(task){
                database.update('tasks', id, {
                    title: title ?? task.title,
                    description: description ?? task.description,
                    updated_at: currentTime.toLocaleString('pt-BR')
                })
                return res.writeHead(204).end()
            }else{
                return res.writeHead(404).end()
            }

            
        }
    },

    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params  
                        
            const [task] = database.select('tasks', { id })
            if(!task){
                return res.writeHead(404).end()
            }
             
            if(task){
                console.log(id, task.id);
                database.update('tasks', id, {
                   completed_at:currentTime.toLocaleString('pt-BR'),
                
                })
                return res.writeHead(204).end()  
            }
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            database.delete('tasks', id)
            return res.writeHead(204).end()
        }
    }


]