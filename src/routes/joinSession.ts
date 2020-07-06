import { RouteParameters } from '../utils'
import { URLSearchParams } from 'url'
import { ok } from 'assert'

export function joinSession ({ request, response, sessions, params }: RouteParameters<{ sessionName: string }>): unknown {
  ok(request.url)
  const search = request.url.slice(request.url.indexOf('?'))
  const password = new URLSearchParams(search).get('password')

  return sessions.get(params.sessionName)?.password === password
    ? response.writeHead(200).end()
    : response.writeHead(403).end();
}