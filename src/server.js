
 import http from 'node:http'

import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

 /* 
 // criar usuários 
 //Listagem usuários
 //Edição de usuários
 //Remoção de usuários


 //HTTP 
 //Método HTTP
 //URL

 // GET, POST, PUT, PATCH, DELETE

 //GET => Buscar um recurso do Back-end
 //POST => Criar u recurso no Back-end
 //PUT  => Atualizar um recurso no Back-end
 //PATCH => Atusalizar uma informação especifica de um recurso no Back-end
 //DELETE => Deletar um recurso do Back-end

 // GET /users => Buscando usuários do Back-end
 //POST /users => Criando um usuário no Back-end

 //HTTP status code
  //Stateful - Stateless

  // Cabeçalhos (Requisições / Resposta) => Metadados
 */

 /**
  * Query Parameters: URL Stateful => Filtros, paginação, não obrigatórios
  * Route Parameters: Indentificação de recurso
  * Request Body: Envio de informação de um formulário (HTTPs)
  * 
  *  1- http://localhost:3333/users?userId=1&name=Paulo
  *  2- GET  http://localhost:3333/users/1
  *  3- DELETE  http://localhost:3333/users/1
  * 
  *   4 - POST  http://localhost:3333/users 
  *   enviano pelo corpo da requisição, formularios.
  */
  
 const server = http.createServer(async (req, res) => {
  const {method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })
    if(route) {
      const routeParams = req.url.match(route.path)
      //console.log(extractQueryParams(routeParams.groups.query));
      
      const {query, ...params} = routeParams.groups

      req.params = params 
      req.query = query ? extractQueryParams(query) : {}
      
      return route.handler(req, res)
    }
    
  return res.writeHead(404).end()
    
 })

 server.listen(3333)