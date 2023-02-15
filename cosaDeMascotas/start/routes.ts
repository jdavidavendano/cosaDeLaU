/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })
  Route.get('/listar-mascotas', 'MascotasController.getListarMascotas')
  Route.get('/listar-por-especie', 'MascotasController.getMascotasPorEspecie')
  Route.get('/listar-menor-edad', 'MascotasController.getMascotasMenoresAEdad')

  Route.post('/registro-mascota', 'MascotasController.setRegistrarMascota')
  Route.post('/editar-mascotas', 'MascotasController.editarMascotas')
}).prefix('/mascotas')
