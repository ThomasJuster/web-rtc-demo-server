import { RouteParameters } from '../utils'

export function sessionExists ({ response, sessions, params }: RouteParameters<{ sessionName: string }>): unknown {
  return response.writeHead(sessions.has(params.sessionName) ? 200 : 404).end();
}
