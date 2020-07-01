import { createSession } from './createSession'
import { joinSession } from './joinSession'
import { sessionExists } from './sessionExists'

export const routes = {
  'PUT /sessions/.+': createSession,
  'PATCH /sessions/.+': joinSession,
  'GET /sessions/.+': sessionExists,
}
