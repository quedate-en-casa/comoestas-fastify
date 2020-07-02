/* eslint-env jest */
const { GenericContainer } = require('testcontainers')
const app = require('../app')
const request = require('request')
const { RecordDomain } = require('comoestas-core/src/record/record.domain')
const { DoctorDomain } = require('comoestas-core/src/doctor/doctor.domain')

const TIMEOUT = 1000000
let db
let fastify
let mongodbContainer

beforeAll(async (done) => {
  mongodbContainer = await new GenericContainer('mongo')
    .withExposedPorts(27017)
    .start()
  db = require('comoestas-mongodb')({
    uri: `mongodb://${mongodbContainer.getContainerIpAddress()}:${mongodbContainer.getMappedPort(27017)}/comoestas`
  })
  fastify = app({
    uri: `mongodb://${mongodbContainer.getContainerIpAddress()}:${mongodbContainer.getMappedPort(27017)}/comoestas`
  })
  fastify.listen(0, (err) => {
    if (err) {
      console.error(err)
    }
  })
  done()
}, TIMEOUT)

afterAll(async (done) => {
  if (fastify) {
    fastify.close()
  }
  if (mongodbContainer) {
    await mongodbContainer.stop()
  }
  done()
}, TIMEOUT)

describe('Rest API test suite', () => {
  beforeAll(async (done) => {
    await db.record.insert(new RecordDomain('PPTH', 'First comment', '1-1', 'Gregory House', 'Good', Date.now()))
    await db.record.insert(new RecordDomain('PPTH', 'Second comment', '1-1', 'Gregory House', 'Good', Date.now()))
    await db.doctor.insert(new DoctorDomain('John Doe', 'PPTH', '1-1', '+56912345678', Date.now()))
    done()
  })
  test('Get records by rut in query string', (done) => {
    const rut = '1-1'
    request({
      method: 'GET',
      url: `http://localhost:${fastify.server.address().port}/record?rut=${rut}`,
      json: true
    }, (err, response, data) => {
      if (err) {
        expect(err).toBeNull()
      }
      expect(response).not.toBeNull()
      expect(response).not.toBeUndefined()
      expect(response.statusCode).toBe(200)
      expect(data).not.toBeNull()
      expect(data).not.toBeUndefined()
      expect(data.registers).not.toBeNull()
      expect(data.registers).not.toBeUndefined()
      expect(data.registers.length).not.toBe(0)
      done()
    })
  }, TIMEOUT)
  test('Get records by rut in path parameter', (done) => {
    const rut = '1-1'
    request({
      method: 'GET',
      url: `http://localhost:${fastify.server.address().port}/record/${rut}`,
      json: true
    }, (err, response, data) => {
      if (err) {
        expect(err).toBeNull()
      }
      expect(response).not.toBeNull()
      expect(response).not.toBeUndefined()
      expect(response.statusCode).toBe(200)
      expect(data).not.toBeNull()
      expect(data).not.toBeUndefined()
      expect(data.registers).not.toBeNull()
      expect(data.registers).not.toBeUndefined()
      expect(data.registers.length).not.toBe(0)
      done()
    })
  }, TIMEOUT)
  test('Create record', (done) => {
    request({
      method: 'POST',
      url: `http://localhost:${fastify.server.address().port}/record`,
      json: true,
      body: {
        doctor: 'Juan Perez',
        doctorComments: 'Se esta mejorando de a poco',
        hospital: 'Sotero de rio',
        rut: '26128425-1',
        status: 'No estable'
      }
    }, (err, response, data) => {
      if (err) {
        expect(err).toBeNull()
      }
      expect(response).not.toBeNull()
      expect(response).not.toBeUndefined()
      expect(response.statusCode).toBe(201)
      expect(data).not.toBeNull()
      expect(data).not.toBeUndefined()
      expect(data.rut).toBe('26128425-1')
      done()
    })
  }, TIMEOUT)
  test('Get doctor by rut in query string', (done) => {
    const rut = '1-1'
    request({
      method: 'GET',
      url: `http://localhost:${fastify.server.address().port}/doctor?rut=${rut}`,
      json: true
    }, (err, response, data) => {
      if (err) {
        expect(err).toBeNull()
      }
      expect(response).not.toBeNull()
      expect(response).not.toBeUndefined()
      expect(response.statusCode).toBe(200)
      expect(data).not.toBeNull()
      expect(data).not.toBeUndefined()
      expect(data.doctor).not.toBeNull()
      expect(data.doctor).not.toBeUndefined()
      expect(data.doctor.ID).not.toBeNull()
      done()
    })
  }, TIMEOUT)
  test('Get doctor by rut in path parameter', (done) => {
    const rut = '1-1'
    request({
      method: 'GET',
      url: `http://localhost:${fastify.server.address().port}/doctor/${rut}`,
      json: true
    }, (err, response, data) => {
      if (err) {
        expect(err).toBeNull()
      }
      expect(response).not.toBeNull()
      expect(response).not.toBeUndefined()
      expect(response.statusCode).toBe(200)
      expect(data).not.toBeNull()
      expect(data).not.toBeUndefined()
      expect(data.doctor).not.toBeNull()
      expect(data.doctor).not.toBeUndefined()
      expect(data.doctor.ID).not.toBeNull()
      done()
    })
  }, TIMEOUT)
  test('Create doctor', (done) => {
    request({
      method: 'POST',
      url: `http://localhost:${fastify.server.address().port}/doctor`,
      json: true,
      body: {
        fullName: 'Alejandro Soto',
        hospital: 'Sotero de rio',
        rut: '26128425-1',
        phone: '973447713'
      }
    }, (err, response, data) => {
      if (err) {
        expect(err).toBeNull()
      }
      expect(response).not.toBeNull()
      expect(response).not.toBeUndefined()
      expect(response.statusCode).toBe(201)
      expect(data).not.toBeNull()
      expect(data).not.toBeUndefined()
      expect(data.newDoctor).not.toBeNull()
      expect(data.newDoctor).not.toBeUndefined()
      expect(data.newDoctor.rut).toBe('26128425-1')
      done()
    })
  }, TIMEOUT)
})
