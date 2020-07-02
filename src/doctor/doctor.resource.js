const { Response } = require('../http')

module.exports.DoctorResource = class {
  constructor (doctorService) {
    this.doctorService = doctorService
  }

  async insert ({ body }) {
    return this.doctorService
      .insert(body)
      .then(doctor => {
        doctor.ID = doctor.id
        delete doctor.id
        return Response
          .Created({
            newDoctor: doctor
          })
      })
  }

  async getByRut ({ rut }) {
    return this.doctorService
      .getByRut(rut)
      .then(doctor => {
        doctor.ID = doctor.id
        delete doctor.id
        return Response.Ok({
          doctor: doctor
        })
      })
  }
}
