import { RouteParameters, extractSessionNameAndPasswordFromURL } from '../utils'

export function sessionExists ({ request, response, sessions }: RouteParameters): unknown {
  const { sessionName } = extractSessionNameAndPasswordFromURL(request.url);
  return response.writeHead(sessions.has(sessionName) ? 200 : 404).end();
}
