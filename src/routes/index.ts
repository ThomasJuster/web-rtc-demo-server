import { createSession } from './createSession'
import { joinSession } from './joinSession'
import { sessionExists } from './sessionExists'
import { home } from './home'

// Watch out the order.
export const routes = {
  'PUT /sessions/.+': createSession,
  'PATCH /sessions/.+': joinSession,
  'GET /sessions/.+': sessionExists,
  'GET /': home,
}
