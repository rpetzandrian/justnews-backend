exports.templateResponse = (statusCode, message, data, error) => { return { statusCode, message, data, error } }
exports.invalidParameter = () => { return this.templateResponse(this.responseCode.BADREQUEST, this.msgList.INVALID_PARAMETER) }
exports.unauthorized = () => { return this.templateResponse(this.responseCode.UNAUTHORIZED, this.msgList.UNAUTHORIZED) }
exports.forbiddenAccess = () => { return this.templateResponse(this.responseCode.FORBIDDEN, this.msgList.UNAUTHORIZED) }
exports.success = (data) => { return this.templateResponse(this.responseCode.OK, this.msgList.OK, data) }
exports.created = (data) => { return this.templateResponse(this.responseCode.CREATED, this.msgList.CREATED, data) }
exports.notFound = () => { return this.templateResponse(this.responseCode.BADREQUEST, this.msgList.NOT_FOUND) }
exports.systemError = (error) => { return this.templateResponse(this.responseCode.INTERNAL_SERVER_ERROR, this.msgList.SYSTEM_ERROR, {}, error) }


exports.responseCode = {
  BADREQUEST: 400,
  OK: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500
}

exports.msgList = {
  OK: 'success!',
  CREATED: `created!`,
  INVALID_PARAMETER: 'invalid_parameter',
  UNAUTHORIZED: 'unauthorized',
  SYSTEM_ERROR: 'system_error',
  USER_NOT_FOUND: 'user_not_found',
  NOT_FOUND: `data_not_found`,
  INVALID_TOKEN: 'invalid_token',
  NO_TOKEN_PROVIDED: 'no_token_provided',
}

