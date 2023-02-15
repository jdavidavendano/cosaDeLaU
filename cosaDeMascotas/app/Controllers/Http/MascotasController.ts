import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Mascota from '../../Models/Mascota'

export default class MascotasController {
  public async getListarMascotas(): Promise<Mascota[]> {
    const mascotas = await Mascota.all()
    return mascotas
  }

  public async setRegistrarMascota({ request, response }: HttpContextContract) {
    const dataRequest = request.only([
      'codigo_animal',
      'nombre_animal',
      'especie',
      'raza',
      'genero',
      'edad',
    ])

    try {
      const codigoAnimal = dataRequest.codigo_animal
      const mascotaExistente: Number = await this.getValidarMascotaExistente(codigoAnimal)
      if (mascotaExistente == 0) {
        await Mascota.create(dataRequest)
        response.status(200).json({ msg: 'Registro completado con exito' })
      } else {
        response.status(400).json({ msg: 'Error, el codigo mascota ya se encuentra registrado' })
      }
    } catch (e) {
      console.log(e)

      response.status(500).json({ msg: 'Error en el servidor !!' })
    }
  }

  private async getValidarMascotaExistente(codigo_animal: Number): Promise<Number> {
    const total = await Mascota.query()
      .where({ codigo_animal: codigo_animal })
      .count('*')
      .from('mascotas')
    return parseInt(total[0]['count(*)'])
  }

  public async getMascotasPorEspecie({
    request,
    response,
  }: HttpContextContract): Promise<Mascota[]> {
    const dataRequest = request.only(['especie'])
    const mascotas = await Mascota.query().where('especie', dataRequest.especie)
    return mascotas
  }

  public async getMascotasMenoresAEdad({
    request,
    response,
  }: HttpContextContract): Promise<Mascota[]> {
    const dataRequest = request.only(['edad'])
    const mascotas = await Mascota.query().where('edad', '<', dataRequest.edad || 8)
    return mascotas
  }

  public async editarMascotas({ request, response }: HttpContextContract) {
    const dataRequest = request.only([
      'codigo_animal',
      'nombre_animal',
      'especie',
      'raza',
      'genero',
      'edad',
    ])

    try {
      const mascota = await Mascota.findOrFail(dataRequest.codigo_animal)

      mascota.nombre_animal = this.thisOrThat(dataRequest.nombre_animal, mascota.nombre_animal)
      mascota.especie = this.thisOrThat(dataRequest.especie, mascota.especie)
      mascota.raza = this.thisOrThat(dataRequest.raza, mascota.raza)
      mascota.genero = this.thisOrThat(dataRequest.genero, mascota.genero)
      mascota.edad = this.thisOrThat(dataRequest.edad, mascota.edad)

      await mascota.save()
      response.status(200).json({ msg: 'Mascota editada con éxito' })
    } catch (e) {
      console.log(e)

      response.status(500).json({ msg: 'Error en el servidor, mascota no existe !!' })
    }
  }

  private thisOrThat(a, b) {
    return a || b
  }
}
