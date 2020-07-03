const Fastify = require('fastify')
const buildOutput = require('comoestas-mongodb')
const buildCore = require('comoestas-core')
const { RecordResource } = require('./src/record/record.resource')
const { DoctorResource } = require('./src/doctor/doctor.resource')

const buildResourceRequest = (request) => {
  return {
    ...request.params,
    body: request.body,
    ...request.query,
    headers: request.headers
  }
}

module.exports = (settings) => {
  const fastify = Fastify({ logger: true })
  const output = buildOutput(settings)
  const core = buildCore(output.doctor, output.record)
  const recordResource = new RecordResource(core.record)
  const doctorResource = new DoctorResource(core.doctor)
  fastify.get('/record', (request, reply) => {
    recordResource
      .getListByRut(buildResourceRequest(request))
      .then(response => {
        if (response.headers) {
          reply.headers(response.headers)
        }
        reply.code(response.statusCode)
        reply.send(response.data)
      })
  })
  fastify.get('/record/:rut', (request, reply) => {
    recordResource
      .getListByRut(buildResourceRequest(request))
      .then(response => {
        if (response.headers) {
          reply.headers(response.headers)
        }
        reply.code(response.statusCode)
        reply.send(response.data)
      })
  })
  fastify.post('/record', (request, reply) => {
    recordResource
      .insert(buildResourceRequest(request))
      .then(response => {
        if (response.headers) {
          reply.headers(response.headers)
        }
        reply.code(response.statusCode)
        reply.send(response.data)
      })
  })

  fastify.post('/record/:rut', (request, reply) => {
    recordResource
      .insert(buildResourceRequest(request))
      .then(response => {
        if (response.headers) {
          reply.headers(response.headers)
        }
        reply.code(response.statusCode)
        reply.send(response.data)
      })
  })

  fastify.get('/doctor', (request, reply) => {
    doctorResource
      .getByRut(buildResourceRequest(request))
      .then(response => {
        if (response.headers) {
          reply.headers(response.headers)
        }
        reply.code(response.statusCode)
        reply.send(response.data)
      })
  })
  fastify.get('/doctor/:rut', (request, reply) => {
    doctorResource
      .getByRut(buildResourceRequest(request))
      .then(response => {
        if (response.headers) {
          reply.headers(response.headers)
        }
        reply.code(response.statusCode)
        reply.send(response.data)
      })
  })
  fastify.post('/doctor', (request, reply) => {
    doctorResource
      .insert(buildResourceRequest(request))
      .then(response => {
        if (response.headers) {
          reply.headers(response.headers)
        }
        reply.code(response.statusCode)
        reply.send(response.data)
      })
  })

  return fastify
}
