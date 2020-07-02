const { Response } = require('../http')

module.exports.RecordResource = class {
  constructor (recordService) {
    this.recordService = recordService
  }

  async insert ({ body }) {
    return this.recordService
      .insert(body)
      .then(record => {
        return Response
          .Created(record)
      })
  }

  async getListByRut ({ rut }) {
    return this.recordService
      .getListByRut(rut)
      .then(records => {
        return Response.Ok({
          registers: records
            .map(r => {
              r.ID = r.id
              delete r.id
              return r
            })
        })
      })
  }
}
