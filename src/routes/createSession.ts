import { RouteParameters } from '../utils'
import { URLSearchParams } from 'url'
import { ok } from 'assert'

export function createSession ({ request, response, sessions, params }: RouteParameters<{ sessionName: string }>): unknown {
  ok(request.url)
  const search = request.url.slice(request.url.indexOf('?'))
  const password = new URLSearchParams(search).get('password')

  if (sessions.has(params.sessionName)) {
    return response.writeHead(401, 'Session is already taken').end();
  }
  sessions.set(params.sessionName, { password, peers: new Map(), settings: {} });
  return response.writeHead(201).end();
}