class Response {
  constructor (statusCode, data) {
    this.statusCode = statusCode
    this.data = data
  }

  addHeaders (headers) {
    this.headers = headers
    return this
  }

  static Created (data) {
    return new Response(201, data)
  }

  static BadRequest (data) {
    return new Response(400, data)
  }

  static Ok (data) {
    return new Response(200, data)
  }

  static NotFound (data) {
    return new Response(404, data)
  }
}

module.exports.Response = Response
